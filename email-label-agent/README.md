# Email Label Agent

An intelligent agent that parses travel-related emails (flights, hotels, receipts) to extract structured itinerary data.

## Key Features
*   **Gmail Ingestion**: Fetches unread emails (filtered by user-specified label, ideally "Travel").
*   **OCR & Preprocessing**: Handles PDF attachments and cleans HTML content.
*   **AI Extraction**: Uses **GPT-4o-mini** to identify booking types (Flight, Hotel, Car, etc.) and extract details like confirmation numbers, times, and costs.

## Setup
1.  **Import**: Import the `email-label-agent.json` workflow into n8n.
2.  **Credentials**: Configure your **Gmail** and **OpenAI** credentials in n8n.
3.  **Critical Step**: The user must specify the label of the folder from which emails are to be extracted within the Gmail node. It is highly recommended to use a specific label like "Travel".
