# Cline Rules: tayler_id_portfolio_redesign_final

## General Principles
- Plan extensively before each function call.
- Reflect extensively on the outcomes of previous function calls.
- Continuously update Memory Bank files, especially `activeContext.md` and `progress.md`.
- Adhere to global `.clinerules` and these project-specific rules.

## Tool Usage
- **Task Manager (`github.com/pashpashpash/mcp-taskmanager`):** Use for all new tasks to break them down into manageable steps. Follow the approve_task_completion flow.
- **SequentialThinking (`github.com/modelcontextprotocol/servers/tree/main/src/sequentialthinking`):** Employ for complex problem-solving, planning detailed steps, and analyzing issues.
- **Memory Bank:** Read ALL memory bank files at the start of tasks. Update relevant files (especially `activeContext.md`, `progress.md`) after significant changes or learnings.
- **Context7 (`github.com/upstash/context7-mcp`):** Use for fetching library documentation. Call `resolve-library-id` first.
- **Exa Search (`github.com/exa-labs/exa-mcp-server`) / Brave Search (`github.com/modelcontextprotocol/servers/tree/main/src/brave-search`):** Use for general web research and to back up decision-making, often before generating Task Manager tasks.
- **Knowledge Graph Memory (`github.com/modelcontextprotocol/servers/tree/main/src/memory`):** Use for storing and retrieving structured information about the project or domain.
- **File System Tools (`read_file`, `write_to_file`, `replace_in_file`, `list_files`):** Use for all direct file interactions. Be precise with paths.
- **`execute_command`:** Run CLI commands directly. Explain commands clearly. Handle paths carefully if operating outside CWD.

## Pre-execution Checks
- **Dependencies:** Before executing code or scripts, verify and install necessary dependencies (e.g., from `package.json` for backend, ensure frontend assets are correctly linked).
- **Server Status:** If interacting with the backend, ensure it's running or attempt to start it. Verify with logs or simple checks if startup is uncertain.

## Specific Project Learnings & Rules (tayler_id_portfolio_redesign_final)
- **RAG System Knowledge Base:** Located in `backend/documentation/`. `ingest_docs.js` processes `.md` and `.pdf` files from this directory.
- **Backend API:** Node.js server at `backend/server.js`, deployed to Fly.io (`https://backend-polished-glitter-7421.fly.dev`).
- **Frontend:** Static site in `src/`, deployed to Netlify (`symphonious-naiad-9dcf23.netlify.app`, custom domain `tayler.id`).
- **JavaScript Analysis:** When analyzing JS (`src/js/main.js`, `src/js/logoParticleSystem.js`), identify classes, trace event flows, understand state management, and how it interacts with the DOM and backend API.
- **Content Focus:** Understand both the code and the *content* of the portfolio (HTML, Markdown in `backend/documentation/`, resume PDFs) to grasp what the site communicates about Tayler.
- **PDF Parsing:** `pdf-parse` is used for PDF text extraction. Be aware of potential parsing issues with complex PDFs (e.g., `Tayler_Ramsay_Resume_Moonvalley.pdf` had issues).
- **Deployment:**
    - Backend: `flyctl deploy` from `backend/` directory.
    - Frontend: Git push to `tayler-id/tayler_id_portfolio_redesign_final` GitHub repo, `main` branch, `src/` publish directory on Netlify.
- **Key Files for Understanding:**
    - `src/index.html`: Main frontend structure.
    - `src/css/styles.css`: Frontend styling.
    - `src/js/main.js`: Frontend logic, chatbot UI, API calls.
    - `src/js/logoParticleSystem.js`: 3D logo animation.
    - `backend/server.js`: Backend API, RAG query pipeline.
    - `backend/ingest_docs.js`: RAG ingestion script.
    - `backend/package.json`: Backend dependencies.
    - `backend/Dockerfile`, `backend/fly.toml`: Backend deployment configuration.
    - `memory-bank/`: All files for project context.
    - `backend/documentation/`: Source material for the RAG chatbot.
- **Contact Form Status:** The contact form (`src/index.html`) is currently client-side only; server-side submission logic is not implemented. This is a potential area for future enhancement.
- **AI Assistant Avatar Discrepancy:** The AI assistant toggle button's avatar (`ai-assistant-avatar` in `src/js/main.js`) uses a 2D canvas animation, distinct from the main 3D `LogoParticleSystem`. This is likely for performance/simplicity.
- **Initial Design vs. Implementation:** The `design_concept.md` mentioned React/Vue.js, but the live implementation uses vanilla JavaScript. This is a key architectural point to remember.

## Feature Integration with Batch Updates
- When handling batch content updates across multiple files that also involve introducing new structural features (e.g., pagination, new sections), ensure the structural HTML/CSS for the new feature is established and tested (even with placeholder content) *before* or *in parallel with* the detailed content population of each file. This can help isolate structural issues from content integration issues.

## Asset Verification
- If a task involves asset changes (e.g., new or renamed logos, images), always use `list_files` to verify exact filenames and paths *before* updating HTML/CSS references.
- If assets are expected in a specific subdirectory (e.g., `src/assets/images/`), confirm their presence there and use relative paths correctly from the referencing HTML/CSS file.

## Browser Testing with Local Files (file:///)
- When testing with `browser_action` on local `file:///` paths, if inter-page click navigation proves unreliable:
    1. Prioritize visual verification of the current page's content and layout.
    2. Use direct navigation (a new `launch` action) to linked pages to verify their individual content, structure, and specific features (like pagination links).
    3. Note the click simulation limitation in test reports or task completion details.
    4. Manually inspect `href` attributes in the HTML to confirm link integrity.
