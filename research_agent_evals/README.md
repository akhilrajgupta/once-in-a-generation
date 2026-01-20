# Research Agent Evaluation Pipeline

A workflow for systematically evaluating AI agent performance using n8n.

## Key Features
*   **Dataset-Driven**: Runs tests against rows in a Google Sheet.
*   **Automated Metrics**: Uses an LLM to grade answers against ground-truth data.
*   **Batch Processing**: Evaluates multiple queries in one run.

## Setup
1.*   **Agent to Evaluate**: Uses a **SerpAPI** (Search) + **Supabase** (RAG) powered agent.

## Steps to Run
1.  **Google Sheet**: Ensure you have a Google Sheet with test cases (questions/answers).
2.  **Credentials**: 
    *   **OpenAI API Key**: For the judge model.
    *   **SerpAPI Key**: For the agent's internet search.
    *   **Google Sheets OAuth**: To read test cases and write results.
3.  **Run**: Execute the workflow to test the agent's performance.
