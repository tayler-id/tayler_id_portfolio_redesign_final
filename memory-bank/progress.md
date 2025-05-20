# Project Progress: Tayler ID Portfolio with AI Chatbot (May 20, 2025)

## 1. What Works / Completed Tasks

*   **Backend API Deployed:**
    *   The Node.js backend server (`backend/server.js`) is successfully deployed to Fly.io.
    *   Live API endpoint: `https://backend-polished-glitter-7421.fly.dev/api/chat`.
    *   Deployment managed via `fly.toml` and `Dockerfile`.
*   **RAG System Functional (Initial Version):**
    *   The RAG pipeline (embedding, vector storage with LanceDB, augmented prompting, response generation) is operational.
    *   Currently ingests a hardcoded list of Markdown files from `backend/documentation/` (which were copied from the root `documentation/` folder).
    *   Uses OpenAI `text-embedding-3-small` and `gpt-3.5-turbo`.
    *   Ingestion script: `backend/ingest_docs.js`.
*   **Frontend API Integration:**
    *   The main JavaScript file for the frontend (`src/js/main.js`) has been updated to point to the live Fly.io backend API endpoint.
*   **Memory Bank Initialized:**
    *   Core Memory Bank files (`projectbrief.md`, `productContext.md`, `systemPatterns.md`, `techContext.md`, `activeContext.md`, `progress.md`) created on May 20, 2025.

## 2. What's Left to Build / Pending Tasks (User Request: "train RAG on me and host site live")

### A. "Train RAG on me" (Personalize Chatbot Knowledge)

*   **User Task:** Create new Markdown (`.md`) files with personal information about "Tayler."
*   **User Task:** Place these new `.md` files into the `backend/documentation/` directory.
*   **Cline Task (Recommended):** Modify `backend/ingest_docs.js` to dynamically scan and process all `.md` files in `backend/documentation/`.
    *   *Status: Pending. This is the next technical step.*
*   **Cline Task (Guided):** Guide user to re-deploy the backend to Fly.io to include new documents and script changes.
    *   *Status: Pending.*
*   **Cline Task (Guided):** Guide user to re-run the ingestion script on the Fly.io instance to update LanceDB.
    *   *Status: Pending.*

### B. "Host site live" (Deploy Frontend)

*   **Cline Task:** Clarify user's preferred static hosting platform (e.g., GitHub Pages, Netlify, Vercel).
    *   *Status: Pending.*
*   **Cline Task (Guided):** Ensure all necessary frontend files are correctly organized for deployment.
    *   *Status: Pending.*
*   **Cline Task:** Provide step-by-step deployment instructions for the chosen platform.
    *   *Status: Pending.*
*   **Cline Task (Guided, Optional):** Guide on DNS configuration if a custom domain is desired.
    *   *Status: Pending.*

## 3. Current Overall Status

*   The backend infrastructure for the AI chatbot is in place and functional with initial documentation.
*   The frontend is ready to communicate with the live backend.
*   The immediate next steps involve enhancing the RAG system's knowledge base with personalized content and then deploying the frontend to make the entire portfolio accessible live.

## 4. Known Issues / Blockers

*   **Hardcoded File List in `ingest_docs.js`:** The current ingestion script is not scalable for easily adding new documents. This is the first technical issue to address for the "Train RAG on me" task.
*   **User Content Creation:** The "Train RAG on me" task is blocked until the user provides the Markdown files with their personal information.
*   **Hosting Platform Choice:** The "Host site live" task is blocked until the user specifies their preferred hosting platform.

## 5. Evolution of Project Decisions & Learnings

*   **Initial RAG Scope:** The RAG system was first populated with project-specific technical documentation. The current request shifts its focus to also include personal information about Tayler, making it a more versatile portfolio tool.
*   **Deployment Strategy:** The project uses a hybrid deployment model: dynamic backend on Fly.io and (soon) static frontend on a dedicated static hosting provider. This is a common and effective pattern.
*   **Importance of Dynamic Ingestion:** The limitation of the current `ingest_docs.js` highlights the need for more flexible data ingestion mechanisms in RAG systems.

This document tracks the project's progress and current state. It will be updated as tasks are completed and new information becomes available.
