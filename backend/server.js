// Only load .env file if not in a Fly.io environment (where secrets are set as env vars)
if (!process.env.FLY_APP_NAME) {
  require('dotenv').config();
}
const express = require('express');
const OpenAI = require('openai');
const cors = require('cors');
const path = require('path'); // Added for LanceDB path
const lancedb = require('@lancedb/lancedb'); // Added for LanceDB
const fs = require('fs'); // Added for fs.promises.mkdir

const app = express();
const port = process.env.PORT || 3000; // Align default with fly.toml internal_port

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON bodies

// Serve static files from the parent directory (portfolio files)
app.use(express.static(path.join(__dirname, '..')));

// Initialize OpenAI client
let openai;
if (process.env.OPENAI_API_KEY) {
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
} else {
  console.warn("OPENAI_API_KEY not found in .env file. OpenAI functionality will be disabled.");
}

// LanceDB setup
const LANCEDB_DIR = path.join(__dirname, 'data', 'lancedb');
const TABLE_NAME = 'portfolio_docs';
const EMBEDDING_MODEL = 'text-embedding-3-small';
let db;
let table;

async function initializeLanceDB() {
  try {
    await fs.promises.mkdir(LANCEDB_DIR, { recursive: true }); // Ensure directory exists, though ingest script should create it
    db = await lancedb.connect(LANCEDB_DIR);
    const tableNames = await db.tableNames();
    if (tableNames.includes(TABLE_NAME)) {
      table = await db.openTable(TABLE_NAME);
      console.log(`LanceDB table '${TABLE_NAME}' opened successfully.`);
    } else {
      console.warn(`LanceDB table '${TABLE_NAME}' not found. RAG will not function until ingestion script is run.`);
      // Optionally, create an empty table here if desired, or rely on ingest_docs.js
    }
  } catch (error) {
    console.error("Failed to initialize LanceDB:", error);
    // RAG functionality will be degraded or disabled
  }
}
initializeLanceDB(); // Call on server start

async function getEmbedding(text) {
  if (!openai) throw new Error("OpenAI client not initialized for embeddings.");
  const response = await openai.embeddings.create({
    model: EMBEDDING_MODEL,
    input: text.replace(/\n/g, ' '),
  });
  return response.data[0].embedding;
}

// API endpoint for chat
app.post('/api/chat', async (req, res) => {
  if (!openai) {
    return res.status(500).json({ error: 'OpenAI client not initialized. Check API key.' });
  }

  const userMessage = req.body.message;

  if (!userMessage) {
    return res.status(400).json({ error: 'Message is required in the request body.' });
  }

  try {
    let context = "";
    if (table) {
      try {
        const queryEmbedding = await getEmbedding(userMessage);
        // Increase limit to potentially get more relevant context
        const results = await table.search(queryEmbedding).limit(5).toArray(); 
        
        if (results.length > 0) {
          let retrievedContext = "Retrieved context from documents:\n";
          results.forEach(item => {
            retrievedContext += `- Source: ${item.source}\nText: ${item.text}\n\n`;
          });
          context = retrievedContext;
        } else {
          // Context will remain empty if no results, system prompt will guide LLM
          console.log("No specific context found in documents for the query.");
        }
      } catch (searchError) {
        console.error("Error during RAG retrieval:", searchError);
        // Context will remain empty, system prompt will guide LLM
      }
    } else {
      console.warn("Knowledge base (LanceDB table) not available. Proceeding without RAG.");
      // Context will remain empty
    }

    const system_prompt = `You are a helpful AI assistant for Tayler Ramsay's portfolio website. Tayler Ramsay is a male (he/him/his).
Your primary goal is to answer user questions based on the provided context from Tayler's documents.
When the user asks about Tayler's professional background, pay close attention to details in the context regarding:
- Job history (companies, roles, dates, responsibilities, achievements)
- Skills (technical, design, soft skills)
- Education and certifications
- Projects and initiatives
Synthesize this information from the context to provide comprehensive and detailed answers.
If the context contains relevant information, use it directly.
If the context does not directly answer a specific detail, state that the specific detail wasn't found in the documents, but you can share what is available or answer more generally about Tayler if appropriate.
Avoid speculation. If no relevant context is found for the query at all, clearly state that.`;
    
    let user_content_for_llm;
    if (context && context.trim() !== "") {
      user_content_for_llm = `Using ONLY the following context from Tayler's documents, answer the user's question. Focus on extracting relevant details as outlined in your system instructions.\n\nContext:\n${context}\n\nUser question: ${userMessage}`;
    } else {
      user_content_for_llm = `User question: ${userMessage}`;
    }

    const messages = [
      { role: 'system', content: system_prompt },
      { role: 'user', content: user_content_for_llm },
    ];
    
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: messages,
    });

    const aiResponse = completion.choices[0]?.message?.content?.trim();
    if (aiResponse) {
      res.json({ response: aiResponse });
    } else {
      res.status(500).json({ error: 'Failed to get a valid response from AI.' });
    }
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    res.status(500).json({ error: 'Failed to communicate with AI service.', details: error.message });
  }
});

app.listen(port, '0.0.0.0', () => { // Explicitly listen on 0.0.0.0
  console.log(`Backend server listening on host 0.0.0.0, port ${port}`);
});
