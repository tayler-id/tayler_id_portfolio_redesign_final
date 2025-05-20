# Technical Context: Tayler ID Portfolio with AI Chatbot

## 1. Frontend Technologies

*   **HTML5:** Standard markup language for structuring the web content.
    *   Main file: `src/index.html`.
*   **CSS3:** Used for styling the visual presentation of the portfolio.
    *   Main file: `src/css/styles.css`.
    *   Possibly global styles in `css/styles.css` (if referenced by `src/index.html`, though current structure suggests `src/css/styles.css` is primary).
*   **JavaScript (ES6+):**
    *   **Core Logic:** `src/js/main.js` handles chatbot UI interactions and API calls to the backend.
    *   **3D Animation:** `src/js/logoParticleSystem.js` implements the 3D logo particle animation.
    *   **Libraries/Frameworks:**
        *   **Three.js:** A core dependency for the 3D logo animation, likely included via `src/js/lib/` or a CDN. The `LogoParticleSystem.js` indicates its usage.
        *   No other major frontend frameworks (like React, Vue, Angular) seem to be in use, suggesting a vanilla JS approach.
*   **Assets:**
    *   Images, fonts, etc., are likely stored in `src/assets/`.
    *   The logo image `logo.png` is present in `src/assets/images/`.

## 2. Backend Technologies (Node.js on Fly.io)

*   **Runtime:** Node.js.
    *   `package.json` in `backend/` defines dependencies and scripts.
*   **Key npm Packages (from `backend/package.json` - *assuming typical RAG setup*):**
    *   `express` (or similar like `fastify`): For creating the web server and API endpoints.
    *   `openai`: Official OpenAI Node.js library for interacting with embedding and chat models.
    *   `vectordb` (LanceDB's Node.js client): For connecting to and querying the LanceDB vector store.
    *   `dotenv`: For managing environment variables (e.g., API keys) locally.
    *   `glob` or `fs.promises`: Potentially for reading documentation files (especially if `ingest_docs.js` is improved).
    *   `langchain` or `llamaindex` (Node.js versions): Could be used for RAG orchestration, though the current description implies a more direct implementation. (This is an assumption, needs verification if `package.json` content is available).
*   **Database:**
    *   **LanceDB:** Used as the vector store. It's an embeddable OLAP database, likely running within the same container as the Node.js application on Fly.io. The database files would be stored in the persistent volume attached to the Fly app (e.g., in `backend/data/`).
*   **API Design:**
    *   RESTful API with at least one endpoint: `POST /api/chat`.
    *   Request/Response format: JSON.

## 3. AI Models & Services

*   **OpenAI:**
    *   `text-embedding-3-small`: Used for generating embeddings for document chunks and user queries.
    *   `gpt-3.5-turbo`: Used for generating responses based on the augmented prompt.
    *   Access: Via the `openai` npm package, requiring an API key.

## 4. Deployment & Infrastructure

*   **Backend (Fly.io):**
    *   **`flyctl`:** CLI tool used for deployment and management.
    *   **`fly.toml`:** Configuration file for the Fly.io application, defining app name, build strategy, services, ports, environment variables, and volume mounts.
    *   **`Dockerfile`:** Defines the Docker image for the backend application. It specifies the base image (e.g., a Node.js image), copies application code, installs dependencies, and sets the startup command.
    *   **Persistent Storage:** Fly.io volumes are likely used to store the LanceDB database files (`backend/data/`) to ensure data persistence across deployments.
*   **Frontend (To Be Determined):**
    *   Will be hosted on a static site hosting platform (e.g., GitHub Pages, Netlify, Vercel).
    *   Deployment will involve pushing the contents of `src/` (and any other necessary root assets/css/js folders) to the chosen platform.
    *   If GitHub Pages is chosen, it will involve configuring the GitHub repository settings.

## 5. Development Environment & Tooling

*   **Version Control:** Git (assumed, standard practice).
*   **Editor:** VSCode (indicated by environment details).
*   **Local Development:**
    *   Backend: Can be run locally using `node backend/server.js` (or a script in `package.json`).
    *   Frontend: `src/index.html` can be opened directly in a browser.
*   **Documentation Format:** Markdown (`.md`) for the RAG knowledge base.

## 6. Technical Constraints & Considerations

*   **API Rate Limits:** OpenAI API usage is subject to rate limits and costs.
*   **Fly.io Free Tier Limits:** The Fly.io deployment is likely on a free or hobby tier, which has limitations on resources (CPU, memory, bandwidth, storage).
*   **LanceDB Performance:** Performance of LanceDB might depend on the size of the knowledge base and the resources available on the Fly.io instance.
*   **Cold Starts:** Serverless functions or applications on free tiers (like Fly.io) can experience cold starts, leading to initial latency.
*   **Security:** API keys (e.g., OpenAI) must be handled securely, typically via environment variables/secrets on Fly.io, and not hardcoded or committed to the repository.
*   **Data Ingestion Time:** Ingesting new documents into LanceDB involves generating embeddings, which can take time depending on the amount of text and API latency.

This document provides an overview of the technologies and technical aspects of the project. It should be updated as new technologies are adopted or configurations change.
