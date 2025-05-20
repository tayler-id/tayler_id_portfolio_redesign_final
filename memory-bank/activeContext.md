# Active Context: Tayler ID Portfolio - RAG Training & Frontend Hosting (May 20, 2025)

## 1. Current Work Focus

The immediate focus is on fulfilling the user's request: **"train RAG on me and host site live."** This breaks down into two main streams of work:

*   **A. Train RAG on "Tayler":**
    1.  **User Action Required:** The user needs to create new Markdown (`.md`) files containing information about themselves ("Tayler").
    2.  **File Placement:** These new `.md` files must be placed in the `backend/documentation/` directory on their local machine.
    3.  **Improve `ingest_docs.js` (Cline Task - Recommended):** Modify `backend/ingest_docs.js` to dynamically scan and process all `.md` files in the `backend/documentation/` directory, instead of using the current hardcoded `filesToProcess` array.
    4.  **Re-deploy Backend (Cline Task - Guided):** Guide the user to re-deploy the backend to Fly.io after new documents are added and `ingest_docs.js` is (potentially) updated. Command:
        ```bash
        cd backend
        flyctl deploy -a backend-polished-glitter-7421
        ```
    5.  **Re-run Ingestion on Fly.io (Cline Task - Guided):** Guide the user to execute the ingestion script on the Fly.io machine to update LanceDB. Command:
        ```bash
        flyctl ssh console -a backend-polished-glitter-7421 -C "node /app/ingest_docs.js"
        ```

*   **B. Host Frontend Site Live:**
    1.  **Clarify User Preference (Cline Task):** Ask the user their preferred platform for hosting the static frontend (e.g., GitHub Pages, Netlify, Vercel).
    2.  **Prepare Files (Cline Task - Guided):** Ensure all necessary frontend files (`src/` directory and any root assets/css/js if directly referenced by `src/index.html`) are correctly organized for deployment.
    3.  **Guide Deployment (Cline Task):** Provide step-by-step instructions for the chosen platform.
    4.  **DNS (Optional - Cline Task - Guided):** If a custom domain is desired, guide on DNS configuration.

## 2. Recent Changes & Decisions

*   **Backend Deployed:** The Node.js backend with the RAG system is live on Fly.io at `https://backend-polished-glitter-7421.fly.dev`.
*   **Frontend API Endpoint Updated:** `src/js/main.js` now correctly points to the live Fly.io API.
*   **Ingestion Path Fixed:** `backend/ingest_docs.js` was previously corrected to look for documentation within `backend/documentation/` (which becomes `/app/documentation/` inside the Docker container on Fly.io).
*   **Memory Bank Initialized:** Core memory bank files (`projectbrief.md`, `productContext.md`, `systemPatterns.md`, `techContext.md`) have just been created (May 20, 2025).

## 3. Next Immediate Steps (Cline's Plan)

1.  **Complete Memory Bank Initialization:** Create `progress.md`.
2.  **Address "Train RAG on me":**
    *   **Task Manager:** Use the Task Manager MCP to plan the sub-tasks for "Train RAG on me".
    *   **Exa Search (Optional):** If needed for best practices on dynamic file reading in Node.js for `ingest_docs.js`.
    *   **Propose `ingest_docs.js` modification:** Suggest and implement the change to dynamically read all `.md` files from `backend/documentation/`.
    *   **Instruct User:** Guide the user on creating their personal `.md` files and placing them in `backend/documentation/`.
    *   **Guide Re-deployment & Re-ingestion:** Walk through the `flyctl deploy` and `flyctl ssh console ... node /app/ingest_docs.js` commands.
3.  **Address "Host site live":**
    *   **Task Manager:** Use the Task Manager MCP to plan the sub-tasks for "Host site live".
    *   **Ask User Preference:** Use `ask_followup_question` for the hosting platform.
    *   **Exa Search (Optional):** If specific deployment steps for the chosen platform need to be researched.
    *   **Guide Deployment:** Provide instructions.

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

*   The RAG system's knowledge is currently limited to the project's technical documentation. Personalizing it with "Tayler's" information is a key step to making it a true portfolio chatbot.
*   The hardcoded file list in `ingest_docs.js` is a point of friction for knowledge base updates. Making it dynamic is a valuable improvement.
*   The separation of frontend and backend allows for independent deployment strategies, which is good.

This document reflects the current state of active work and thinking. It will be updated frequently as tasks progress.
