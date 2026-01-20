# Research Agent

A comprehensive AI research assistant capable of both real-time internet search and document-based RAG.

## Key Features
*   **Live Web Search**: Uses **SerpAPI** (Google Search) for real-time information.
*   **Document RAG**: Integrated **Supabase Vector Store** template (requires Setup).
*   **Memory**: Maintains chat history for follow-up questions.

## Setup
1.  **Import**: Load the workflow JSON into n8n.
2.  **Credentials**: 
    *   **OpenAI**: For generation and embeddings.
    *   **SerpAPI**: For internet search.
    *   **Supabase** (Optional): To enable document search/RAG.
3.  **Usage**: Send a query to the chat webhook.
