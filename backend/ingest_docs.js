require('dotenv').config();
const fs = require('fs').promises;
const path = require('path');
const OpenAI = require('openai');
const lancedb = require('@lancedb/lancedb');
const { marked } = require('marked');
const pdf = require('pdf-parse');

const openaiApiKey = process.env.OPENAI_API_KEY;
if (!openaiApiKey) {
  console.error("OPENAI_API_KEY not found in .env file. Ingestion script cannot run.");
  process.exit(1);
}

const openai = new OpenAI({ apiKey: openaiApiKey });
const EMBEDDING_MODEL = 'text-embedding-3-small'; // Recommended by Cline
const LANCEDB_DIR = path.join(__dirname, 'data', 'lancedb');
const DOCS_DIR = path.join(__dirname, 'documentation'); // Changed: Look for docs inside backend/ (relative to /app in container)
const TABLE_NAME = 'portfolio_docs';

// Simple text chunker (e.g., by paragraphs or fixed size)
// For markdown, splitting by paragraphs (double newlines) can be effective.
// Or, more robustly, parse markdown to text then chunk.
function chunkText(text, chunkSize = 500, overlap = 50) {
  // This is a very basic chunker, can be improved
  const chunks = [];
  let i = 0;
  while (i < text.length) {
    chunks.push(text.substring(i, Math.min(i + chunkSize, text.length)));
    i += (chunkSize - overlap);
    if (i + overlap >= text.length && i < text.length) { // Ensure last part is captured
        chunks.push(text.substring(i));
        break;
    }
  }
  return chunks.filter(chunk => chunk.trim() !== '');
}

async function getEmbedding(text) {
  try {
    const response = await openai.embeddings.create({
      model: EMBEDDING_MODEL,
      input: text.replace(/\n/g, ' '), // OpenAI recommends replacing newlines
    });
    return response.data[0].embedding;
  } catch (error) {
    console.error(`Failed to get embedding for text: "${text.substring(0, 50)}..."`, error);
    throw error;
  }
}

async function processFile(filePath) {
  console.log(`Processing file: ${filePath}`);
  const fileExtension = path.extname(filePath).toLowerCase();
  
  let plainText;

  if (fileExtension === '.md') {
    const fileContent = await fs.readFile(filePath, 'utf-8');
    // Convert markdown to plain text using marked
    const renderer = new marked.Renderer();
    renderer.heading = (text) => `${text}\n`;
    renderer.paragraph = (text) => `${text}\n\n`;
    renderer.listitem = (text) => `* ${text}\n`;
    renderer.code = (code, language) => `\n\`\`\`${language || ''}\n${code}\n\`\`\`\n\n`; // Keep code blocks somewhat distinct
    renderer.html = () => ''; // Strip HTML
    renderer.hr = () => '\n---\n';
    renderer.blockquote = (quote) => `> ${quote}\n\n`;
    renderer.link = (href, title, text) => text; // Just keep link text
    renderer.image = (href, title, text) => text || title || ''; // Just keep alt text or title
    marked.setOptions({ renderer });
    plainText = marked.parse(fileContent);
  } else if (fileExtension === '.pdf') {
    const dataBuffer = await fs.readFile(filePath);
    try {
      const pdfData = await pdf(dataBuffer);
      plainText = pdfData.text;
      console.log(`  Successfully extracted text from PDF: ${path.basename(filePath)} (first 100 chars): "${plainText.substring(0,100).replace(/\s+/g, ' ')}..."`);
    } catch (pdfError) {
      console.error(`  Error parsing PDF ${path.basename(filePath)}: ${pdfError.message}. Skipping file.`);
      return [];
    }
  } else {
    console.log(`  Unsupported file type: ${fileExtension}. Skipping.`);
    return [];
  }
  
  const chunks = chunkText(plainText); // Chunk the plain text
  const data = [];

  for (const chunk of chunks) {
    if (chunk.trim().length < 20) continue; // Skip very small chunks
    try {
      const embedding = await getEmbedding(chunk);
      data.push({
        text: chunk,
        source: path.basename(filePath),
        embedding: embedding,
      });
      console.log(`  Embedded chunk from ${path.basename(filePath)} starting with: "${chunk.substring(0,30)}..."`);
      await new Promise(resolve => setTimeout(resolve, 300)); // Rate limit for OpenAI API
    } catch (error) {
      console.error(`  Skipping chunk due to embedding error: ${error.message}`);
    }
  }
  return data;
}

async function main() {
  console.log('Starting document ingestion...');
  await fs.mkdir(LANCEDB_DIR, { recursive: true });
  const db = await lancedb.connect(LANCEDB_DIR);
  
  const allDocsData = [];
  let filesToProcess = [];
  const supportedExtensions = ['.md', '.pdf'];

  try {
    console.log(`Scanning for ${supportedExtensions.join(' or ')} files in ${DOCS_DIR}...`);
    const allFilesInDir = await fs.readdir(DOCS_DIR);
    filesToProcess = allFilesInDir.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return supportedExtensions.includes(ext);
    });

    if (filesToProcess.length === 0) {
      console.log(`No supported files (${supportedExtensions.join(', ')}) found in ${DOCS_DIR}.`);
    } else {
      console.log(`Found supported files: ${filesToProcess.join(', ')}`);
    }
  } catch (error) {
    console.error(`Error reading documentation directory ${DOCS_DIR}:`, error);
    // If we can't read the directory, we can't proceed with finding files.
    // Depending on desired behavior, we could exit or try to continue with an empty list.
    // For now, filesToProcess will remain empty, and the script will later exit if no data.
  }

  for (const fileName of filesToProcess) {
    const filePath = path.join(DOCS_DIR, fileName);
    try {
      const fileData = await processFile(filePath); // Changed function call
      allDocsData.push(...fileData);
    } catch (error) {
      console.error(`Could not process file ${fileName}: ${error.message}`);
    }
  }

  if (allDocsData.length === 0) {
    console.log('No data to ingest. Exiting.');
    return;
  }

  console.log(`Total chunks to ingest: ${allDocsData.length}`);

  try {
    // Check if table exists, delete if it does for a fresh ingest
    const tableNames = await db.tableNames();
    if (tableNames.includes(TABLE_NAME)) {
      console.log(`Table '${TABLE_NAME}' exists. Dropping for fresh ingest.`);
      await db.dropTable(TABLE_NAME);
    }
    
    console.log(`Creating table '${TABLE_NAME}'...`);
    // LanceDB infers schema from the first batch of data if not provided explicitly.
    // For vector columns, it's good practice to provide a sample for schema inference.
    // The vector dimension for text-embedding-3-small is 1536.
    // Example for explicit schema (if needed, but add() usually infers well):
    // const schema = {
    //   text: "string",
    //   source: "string",
    //   embedding: lancedb.vector(1536) // Specify vector dimension
    // };
    // const table = await db.createTable(TABLE_NAME, schema, allDocsData);
    
    const table = await db.createTable(TABLE_NAME, allDocsData);
    console.log(`Table '${TABLE_NAME}' created and ${allDocsData.length} records ingested.`);
  } catch (error) {
    console.error('Error during LanceDB table creation or ingestion:', error);
  }
}

main().catch(console.error);
