# Active Context: Tayler ID Portfolio - RAG Training & Frontend Hosting (May 20, 2025)

## 1. Current Work Focus

The user's request **"train RAG on me and host site live"** has been addressed.
*   The RAG system has been trained with personal documents (MD and PDF).
*   The frontend site has been deployed to Netlify, with the custom domain `tayler.id` configured (pending final DNS propagation verification by the user).

There are no immediate pending work items from this request, aside from the user's final check of the custom domain.

## 2. Recent Changes & Decisions

*   **RAG System Enhanced (May 20, 2025):**
    *   `backend/ingest_docs.js` updated to dynamically scan for `.md` and `.pdf` files.
    *   `pdf-parse` library added as a dependency for PDF text extraction.
    *   User added personal MD and PDF documents to `backend/documentation/`.
    *   Backend re-deployed to Fly.io with these changes.
    *   Ingestion script re-run on Fly.io, successfully processing new documents (except one problematic PDF).
    *   `backend/server.js` updated with improved system prompt (specifying Tayler's gender as male, guiding context usage) and logic for handling RAG results, significantly improving AI assistant responses. Backend re-deployed.
*   **Frontend Site Deployed (May 20, 2025):**
    *   User chose Netlify as the hosting platform.
    *   Frontend files in `src/` confirmed ready for deployment.
    *   Local project directory `/Users/tramsay/Desktop/tayler_id_portfolio_redesign_final` initialized as a Git repository.
    *   A new GitHub repository `tayler-id/tayler_id_portfolio_redesign_final` was created and local project pushed to it.
    *   Netlify site connected to the GitHub repository, configured to deploy the `main` branch from the `src/` directory.
    *   Custom domain `tayler.id` (and `www.tayler.id`) configured on Netlify using Netlify DNS. User updated nameservers at Namecheap.
    *   Netlify dashboard confirms domain and SSL are set up. User will verify `tayler.id` functionality after DNS propagation.
*   **Backend Deployed:** The Node.js backend with the RAG system is live on Fly.io at `https://backend-polished-glitter-7421.fly.dev`.
*   **Frontend API Endpoint Updated:** `src/js/main.js` now correctly points to the live Fly.io API.
*   **Ingestion Path Fixed:** `backend/ingest_docs.js` was previously corrected to look for documentation within `backend/documentation/` (which becomes `/app/documentation/` inside the Docker container on Fly.io).
*   **Memory Bank Initialized:** Core memory bank files (`projectbrief.md`, `productContext.md`, `systemPatterns.md`, `techContext.md`) have just been created (May 20, 2025).

## 3. Next Immediate Steps (Cline's Plan)

*   Await user confirmation on `tayler.id` custom domain functionality after DNS propagation.
*   Address the unparsed PDF (`Tayler_Ramsay_Resume_Moonvalley.pdf`) if the user wishes to pursue it.

## 4. Important Patterns & Preferences (from `.clinerules` and initial context)

*   **Memory Bank First:** Always read/update Memory Bank files at the start and during tasks.
*   **Tool Usage:**
    *   Utilize `SequentialThinking` MCP for complex problem-solving.
    *   Use `Context7` and `Perplexity Research` (via Exa or Brave Search if Perplexity isn't a direct tool) for documentation/research.
    *   Employ `Knowledge Graph Memory` (Memory MCP) for storing/retrieving structured information.
    *   Use `File System` tools for any file interactions.
    *   Use `Task Manager` MCP for all new tasks to break them down.
    *   Use `Exa Search` before generating task lists for Task Manager to back up decision-making.
*   **Workspace Rules (`tayler_id_portfolio_redesign_final/.clinerules`):**
    *   Consult `documentation/` first (though for RAG, it's `backend/documentation/`).
    *   When analyzing JS: identify classes, trace events/loops, understand state management.
    *   Prioritize updating `activeContext.md` and `progress.md` for particle system findings (and now RAG/deployment).
*   **User Interaction:**
    *   Run commands directly; do not ask the user to run them.
    *   Offer reflection and `.clinerules` updates before `attempt_completion` for non-trivial tasks with feedback.

## 5. Learnings & Project Insights (So Far)

*   The RAG system's knowledge is now personalized with "Tayler's" information, making it a more effective portfolio chatbot.
*   Dynamically scanning for both `.md` and `.pdf` files in `ingest_docs.js` (using `pdf-parse` for PDFs) significantly improves the ease of updating the knowledge base.
*   Explicitly defining gender in the AI's system prompt and refining context handling logic in `server.js` are crucial for accurate and relevant AI responses.
*   The separation of frontend (Netlify) and backend (Fly.io) allows for independent deployment and scaling.
*   Initializing a local Git repository correctly and connecting it to a remote (GitHub) is essential before integrating with Git-based deployment services like Netlify.
*   DNS propagation requires patience; Netlify's dashboard provides good indicators of its own setup status.
*   One PDF (`Tayler_Ramsay_Resume_Moonvalley.pdf`) encountered parsing errors ("bad XRef entry"), indicating potential issues with the PDF file itself or limitations of `pdf-parse` with that specific file.

This document reflects the current state of active work and thinking. It will be updated frequently as tasks progress.
