# Supabase RAG Chatbot

A Retrieval-Augmented Generation chatbot with persistent memory.

## Key Features
*   **Vector Search**: Uses Supabase (pgvector) to store and retrieve document knowledge.
*   **Persistent Memory**: Stores chat context in PostgreSQL.
*   **Document Loader**: Processes and embeds PDFs/text from Google Drive.

## Setup
1.  **Import**: Import the workflow JSON.
2.  **Credentials**: Configure **OpenAI**, **Supabase**, **PostgreSQL**, and **Google Drive**.
3.  **Process Docs**: Run the ingestion pipeline once to populate the vector store.
4.  **Chat**: Connect your frontend to the chat webhook.
