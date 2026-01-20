# AI Financial Analyst

An n8n workflow that acts as a real-time AI financial analyst. It performs research, maintains conversation context, and delivers professional investment insights without code.

## Key Features
*   **Real-time Research**: Uses **SerpAPI** for live market data.
*   **Financial Reasoning**: Powered by OpenAI GPT-4o Mini.
*   **Contextual Memory**: Remembers previous interactions in the session.

## Setup
1.  **Import**: Import the `.json` workflow file into n8n.
2.  **Credentials**: Configure **OpenAI** and **SerpAPI** credentials in n8n.
3.  **Run**: Trigger via webhook with a JSON payload containing `username` and `query`.
