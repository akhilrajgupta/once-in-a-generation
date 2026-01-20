# Airbnb Search Automation

This workflow automates finding and emailing Airbnb listings based on user queries.

## Key Features
*   **AI Interpretation**: Uses OpenAI to understand natural language search requests.
*   **MCP Integration**: Connects to Airbnb data via Model Context Protocol.
*   **Email Delivery**: Formats top picks into a styled HTML email.

## Setup
1.  **Import**: Import `airbnb_agent.json` into n8n.
2.  **Credentials**: Set up **OpenAI**, **MCP Client**, and **Gmail** credentials.
3.  **Deploy**: Use the generated webhook URL in your frontend application.
