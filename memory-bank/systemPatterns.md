# System Patterns: Tayler ID Portfolio with AI Chatbot

## 1. Overall Architecture

The system follows a client-server architecture:

*   **Client (Frontend):** A static website built with HTML, CSS, and JavaScript. It's responsible for rendering the portfolio content, the 3D logo animation, and the chatbot UI. It communicates with the backend API for chat functionality.
*   **Server (Backend):** A Node.js application hosted on Fly.io. It exposes an API endpoint for the RAG-powered chatbot.

```mermaid
graph TD
    User[User] --> FE[Frontend (Static Site - e.g., GitHub Pages)];
    FE -->|HTTPS API Call| BE[Backend API (Fly.io)];
    BE --> RAG[RAG System];
    RAG --> OpenAI_Embed[OpenAI Embedding API];
    RAG --> LanceDB[LanceDB (Vector Store)];
    RAG --> OpenAI_Chat[OpenAI Chat Completion API];

    subgraph Frontend
        direction LR
        HTML[HTML]
        CSS[CSS]
        JS[JavaScript]
        LogoAnim[3D Logo Animation (Three.js)]
        ChatUI[Chat UI]
    end

    subgraph Backend
        direction LR
        NodeJS[Node.js Server]
        APIEndpoint[/api/chat]
    end

    subgraph RAG System
        direction LR
        Ingest[Ingest Script (ingest_docs.js)]
        Query[Query Processing]
        PromptAug[Prompt Augmentation]
    end

    Ingest --> Docs[Documentation Files (.md)];
    Docs --> OpenAI_Embed;
    OpenAI_Embed --> LanceDB;
```

## 2. Frontend Patterns

*   **Static Site:** The frontend is composed of static assets (HTML, CSS, JS, images).
    *   Main portfolio page: `src/index.html`.
    *   Individual Case Study Pages: Static HTML files located in `src/work/` (e.g., `src/work/aspen-dental.html`). Each case study page is self-contained but links to common CSS and JS.
*   **Vanilla JavaScript:** Core logic, including the 3D logo animation (`logoParticleSystem.js`) and chatbot interaction (`main.js`), appears to be written in vanilla JavaScript.
*   **Modular JS:** JavaScript is split into modules (e.g., `main.js`, `logoParticleSystem.js`).
*   **API Consumption:** The frontend uses `fetch` to make asynchronous calls to the backend API.
*   **DOM Manipulation:** JavaScript directly manipulates the DOM to update the chat interface and potentially other dynamic content.

## 3. Backend Patterns (Node.js on Fly.io)

*   **RESTful API:** A single API endpoint (`/api/chat`) is exposed for chat functionality.
*   **Containerization:** The backend is deployed using Docker, as indicated by `Dockerfile` and `fly.toml`.
*   **Environment Variables:** Likely uses environment variables (e.g., for API keys), managed via Fly.io secrets or a `.env` file (though `.env` should not be committed for production secrets).
*   **Asynchronous Operations:** Node.js inherently handles I/O asynchronously, crucial for interacting with OpenAI APIs and LanceDB.

## 4. RAG System Patterns

*   **Ingestion Pipeline (`ingest_docs.js`):**
    1.  Reads Markdown files from a specified directory (`backend/documentation/`).
    2.  Chunks text (implicitly or explicitly).
    3.  Generates embeddings for text chunks using OpenAI's `text-embedding-3-small` model.
    4.  Stores embeddings and corresponding text in a LanceDB vector database.
    *   **Current Limitation:** The `ingest_docs.js` script uses a hardcoded list of files. A more robust pattern would be to dynamically scan the directory for all `.md` files.
*   **Query Pipeline (`server.js` - `/api/chat` endpoint):**
    1.  Receives a user query.
    2.  Generates an embedding for the user query using the same OpenAI model.
    3.  Performs a similarity search in LanceDB to retrieve relevant document chunks.
    4.  Constructs an augmented prompt by combining the original query with the retrieved context.
    5.  Sends the augmented prompt to OpenAI's `gpt-3.5-turbo` model for response generation.
    6.  Returns the generated response to the frontend.
*   **Vector Database:** LanceDB is used for efficient storage and retrieval of text embeddings. It's likely running embedded within the Fly.io application instance.

## 5. Deployment Patterns

*   **Backend (Fly.io):**
    *   Deployed via `flyctl deploy`.
    *   Configuration managed by `fly.toml`.
    *   Build process defined in `Dockerfile`.
    *   The application runs within a container on Fly.io's infrastructure.
*   **Frontend (Netlify):**
    *   Deployed to Netlify (`symphonious-naiad-9dcf23.netlify.app`, custom domain `tayler.id`).
    *   Deployment is via Git push to the `tayler-id/tayler_id_portfolio_redesign_final` GitHub repository (`main` branch, `src/` publish directory).
    *   Individual case study pages (e.g. `src/work/aspen-dental.html`) are served as static files, accessible via URLs like `tayler.id/work/aspen-dental.html`.

## 6. Key Technical Decisions (Observed)

*   **Choice of RAG Components:** OpenAI for embeddings and chat, LanceDB for vector storage. This implies a preference for managed services (OpenAI) and a lightweight, embeddable vector DB.
*   **Backend Technology:** Node.js, suitable for I/O-bound applications and JavaScript ecosystem consistency.
*   **Frontend Technology:** Vanilla HTML, CSS, JS, indicating a desire for simplicity or direct control over the frontend, without a heavy framework.
*   **Backend Deployment Platform:** Fly.io, offering containerized deployment and a generous free tier.

This document captures the high-level system design and common patterns. It should be updated as new architectural decisions are made or existing patterns evolve.
