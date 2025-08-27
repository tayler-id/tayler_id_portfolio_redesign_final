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

function stripHtml(html) {
  // Basic stripper: replace block elements that imply newlines, then strip all other tags.
  let text = html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/(h[1-6]|p|div|li)>/gi, (match, tag) => {
      if (tag.startsWith('h') || tag === 'p' || tag === 'div') {
        return '\n\n';
      }
      return '\n';
    })
    .replace(/<hr\s*\/?>/gi, '\n---\n'); // Handle horizontal rules

  // Strip all remaining HTML tags
  text = text.replace(/<[^>]+>/g, '');

  // Decode common HTML entities
  text = text.replace(/&nbsp;/g, ' ')
             .replace(/&/g, '&')
             .replace(/</g, '<')
             .replace(/>/g, '>')
             .replace(/"/g, '"')
             .replace(/&#39;/g, "'")
             .replace(/&#x27;/g, "'"); // Another form of apostrophe

  // Normalize multiple newlines to a maximum of two (for paragraph separation)
  text = text.replace(/\n\s*\n+/g, '\n\n');
  return text.trim();
}

function chunkText(text, chunkSize = 500, overlap = 50) {
  const chunks = [];
  let i = 0;
  while (i < text.length) {
    const end = Math.min(i + chunkSize, text.length);
    chunks.push(text.substring(i, end));
    if (end === text.length) break; // Reached the end
    i += (chunkSize - overlap);
    // Ensure that if i is already near the end, the loop condition handles it.
    // e.g. if i becomes very close to text.length, the next chunk will be short.
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
    // Convert markdown to HTML first
    const htmlOutput = marked.parse(fileContent);
    // Then strip HTML to get plain text
    plainText = stripHtml(htmlOutput);
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
  
  let chunks;
  if (fileExtension === '.md') {
    // For Markdown, try to split by paragraphs first
    const paragraphs = plainText.split(/\n\s*\n+/); // Split by one or more blank lines
    chunks = [];
    for (const para of paragraphs) {
      const trimmedPara = para.trim();
      if (trimmedPara.length === 0) continue;
      // If a paragraph is too long, use the character-based chunker for that paragraph
      // Max typical paragraph length for good context might be around 100-200 words (e.g. 500-1000 chars)
      // Let's set a threshold, e.g., 700 characters.
      if (trimmedPara.length > 700) { 
        chunks.push(...chunkText(trimmedPara, 500, 50)); // Use existing chunkText for very long paragraphs
      } else {
        chunks.push(trimmedPara);
      }
    }
  } else {
    // For PDF (and potentially other future plain text types if plainText is populated)
    // Try to split by paragraphs first
    const paragraphs = plainText.split(/\n\s*\n+/); // Split by one or more blank lines
    chunks = [];
    for (const para of paragraphs) {
      const trimmedPara = para.trim();
      if (trimmedPara.length === 0) continue;
      // If a paragraph is too long, use the character-based chunker for that paragraph
      if (trimmedPara.length > 700) { // Threshold for "too long"
        chunks.push(...chunkText(trimmedPara, 500, 50)); 
      } else {
        chunks.push(trimmedPara);
      }
    }
  }
  
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

  // Define the schema explicitly
  // Assuming lancedb.vector and lancedb.schema are available helpers
  // For text-embedding-3-small, the dimension is 1536.
  const vectorType = lancedb.vector(1536); 
  const schema = lancedb.schema([
    { name: 'text', type: new lancedb.StringType() },
    { name: 'source', type: new lancedb.StringType() },
    { name: 'embedding', type: vectorType }
  ]);

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
    // const table = await db.createTable(TABLE_NAME, schema, allDocsData); // Old thought
    
    // Create table with explicit schema and overwrite mode
    const table = await db.createTable(TABLE_NAME, allDocsData, { schema: schema, mode: 'overwrite' });
    console.log(`Table '${TABLE_NAME}' created with explicit schema and ${allDocsData.length} records ingested.`);
  } catch (error) {
    console.error('Error during LanceDB table creation or ingestion:', error);
  }
}

main().catch(console.error);
