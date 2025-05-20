# Project Brief: Tayler ID Portfolio Redesign with AI Chatbot

## 1. Project Overview

This project involves enhancing a portfolio website, presumably for "Tayler," by integrating an AI-powered chatbot. The chatbot utilizes a Retrieval Augmented Generation (RAG) system to provide contextually relevant answers based on a knowledge base.

The current high-level goals are to:
1.  Personalize the RAG system by ingesting information about "Tayler" ("Train RAG on me").
2.  Deploy the frontend of the portfolio website to a live static hosting provider ("Host site live").

## 2. Core Goals & Requirements

*   **AI Chatbot:** Implement and maintain an AI chatbot capable of answering questions based on a defined set of documents.
*   **Knowledge Base Expansion:** Allow for easy expansion of the RAG system's knowledge base with new information.
*   **Live Deployment:** Both the backend (API) and frontend (static site) should be deployed and accessible live.
*   **Portfolio Enhancement:** The chatbot should seamlessly integrate with and enhance the existing portfolio website.

## 3. Key Components

*   **Frontend:**
    *   Technology: HTML, CSS, JavaScript.
    *   Features: Includes a 3D logo particle animation (`logoParticleSystem.js`).
    *   Interaction: Communicates with the backend API for chat functionality.
    *   Location: `src/` directory.
*   **Backend (Chatbot API):**
    *   Technology: Node.js.
    *   Deployment: Hosted on Fly.io (`https://backend-polished-glitter-7421.fly.dev`).
    *   Functionality: Provides an API endpoint (`/api/chat`) for the RAG system.
    *   Location: `backend/` directory.
*   **RAG System:**
    *   Embedding Model: OpenAI `text-embedding-3-small`.
    *   Vector Store: LanceDB.
    *   Response Generation Model: OpenAI `gpt-3.5-turbo`.
    *   Ingestion Script: `backend/ingest_docs.js`.
    *   Knowledge Base Source: Markdown files located in `backend/documentation/`.

## 4. Current Project Status (as of May 20, 2025)

*   The AI chatbot backend is successfully deployed and operational on Fly.io.
*   The RAG system is functional and populated with initial project documentation from the `documentation/` folder (copied to `backend/documentation/`).
*   The frontend (`src/index.html`) has been updated to communicate with the live Fly.io backend API.

## 5. Immediate Objectives (User Request: "train RAG on me and host site live")

1.  **"Train RAG on me":**
    *   Incorporate new documents containing personal information about "Tayler" into the RAG system's knowledge base.
    *   This involves placing new `.md` files in `backend/documentation/`.
    *   Potentially improve `backend/ingest_docs.js` to dynamically process all `.md` files in its source directory.
    *   Re-deploy the backend to Fly.io to include new documents and script changes.
    *   Re-run the ingestion script on the Fly.io instance.
2.  **"Host site live":**
    *   Deploy the static frontend (HTML, CSS, JS, assets) to a suitable hosting platform (e.g., GitHub Pages, Netlify, Vercel).
    *   This requires clarifying the user's preferred platform and guiding them through the deployment process.

This document serves as the foundational understanding of the project. It will be referenced and updated as the project evolves.
