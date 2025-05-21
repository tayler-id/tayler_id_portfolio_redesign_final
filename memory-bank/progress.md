# Project Progress: Tayler ID Portfolio with AI Chatbot (May 20, 2025)

## 1. What Works / Completed Tasks

*   **Backend API Deployed & Enhanced:**
    *   The Node.js backend server (`backend/server.js`) is successfully deployed to Fly.io.
    *   Live API endpoint: `https://backend-polished-glitter-7421.fly.dev/api/chat`.
    *   Deployment managed via `fly.toml` and `Dockerfile`.
    *   `backend/server.js` updated with improved system prompt (specifying Tayler's gender as male, guiding context usage) and logic for handling RAG results, significantly improving AI assistant responses. Backend re-deployed.
*   **RAG System Functional & Personalized:**
    *   The RAG pipeline (embedding, vector storage with LanceDB, augmented prompting, response generation) is operational.
    *   `backend/ingest_docs.js` updated to dynamically scan for `.md` and `.pdf` files (using `pdf-parse` for PDFs).
    *   User added personal MD and PDF documents to `backend/documentation/`.
    *   Ingestion script re-run on Fly.io, successfully processing new documents (except one problematic PDF: `Tayler_Ramsay_Resume_Moonvalley.pdf`).
    *   Uses OpenAI `text-embedding-3-small` and `gpt-3.5-turbo`.
*   **Frontend Site Deployed to Netlify:**
    *   User chose Netlify as the hosting platform.
    *   Frontend files in `src/` confirmed ready.
    *   Local project directory `/Users/tramsay/Desktop/tayler_id_portfolio_redesign_final` initialized as a Git repository.
    *   New GitHub repository `tayler-id/tayler_id_portfolio_redesign_final` created and local project pushed.
    *   Netlify site (`symphonious-naiad-9dcf23.netlify.app`) connected to GitHub, deploying `main` branch from `src/`. **The default Netlify URL is confirmed working.**
    *   Custom domain `tayler.id` configured on Netlify using Netlify DNS; user updated nameservers at Namecheap. Netlify dashboard shows domain and SSL ready.
*   **Frontend API Integration:**
    *   The main JavaScript file for the frontend (`src/js/main.js`) correctly points to the live Fly.io backend API endpoint.
*   **Memory Bank Initialized:**
    *   Core Memory Bank files created and updated (May 20, 2025).

## 2. What's Left to Build / Pending Tasks

*   **User Verification:** User to verify full functionality of `tayler.id` custom domain after DNS propagation completes.
*   **Optional:** Address the unparsed PDF (`Tayler_Ramsay_Resume_Moonvalley.pdf`) if the user wishes to.

## 3. Current Overall Status

*   The backend AI chatbot is trained with personal documents and deployed.
*   The frontend website is deployed to Netlify (default URL `symphonious-naiad-9dcf23.netlify.app` confirmed working) and connected to the custom domain `tayler.id`.
*   The primary request "train RAG on me and host site live" is functionally complete, pending final DNS propagation for the custom domain `tayler.id`.

## 4. Known Issues / Blockers

*   **DNS Propagation:** Full functionality of `tayler.id` is dependent on global DNS propagation, which can take time.
*   **Unparsed PDF:** One PDF document (`Tayler_Ramsay_Resume_Moonvalley.pdf`) could not be ingested due to a parsing error ("bad XRef entry"). This means its content is not currently in the RAG knowledge base.

## 5. Evolution of Project Decisions & Learnings

*   **RAG Personalization:** Successfully personalized the RAG system with Tayler's documents, enhancing the chatbot's utility.
*   **Dynamic Ingestion:** Implemented dynamic scanning for `.md` and `.pdf` files in `ingest_docs.js`, improving knowledge base maintainability. Added `pdf-parse` for PDF content.
*   **Prompt Engineering:** Refined system prompts and context handling in `backend/server.js` to improve AI response quality and accuracy (including gender-specific pronouns).
*   **Deployment Strategy:** Successfully executed a hybrid deployment: dynamic backend on Fly.io and static frontend on Netlify.
*   **Git & GitHub for Deployment:** Established a local Git repository, pushed to a new GitHub remote, and integrated with Netlify for CI/CD of the frontend.
*   **Custom Domain Setup:** Navigated Netlify and Namecheap settings to configure `tayler.id` with Netlify DNS.
*   **Netlify Deployment Quirks:** Confirmed that changing Netlify build settings (like Publish Directory) might require a new Git push to reliably take effect, rather than just a UI-triggered deploy.
*   **PDF Parsing Challenges:** Encountered an issue with one PDF, highlighting that PDF parsing can sometimes be problematic depending on file structure/corruption.

This document tracks the project's progress and current state. It will be updated as tasks are completed and new information becomes available.
