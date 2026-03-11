# Akhil's Agent Playground

Hey! I'm **Akhil**, and this is my personal sandbox for building and experimenting with autonomous AI agents.

Most of the work here is built on **n8n**, connecting various AI models and tools to create helpful workflows

---

## The Agents

Here's a lineup of the bots I've built/imported so far:

*   **Finance Agent**: A real-time financial analyst. It performs market research using **SerpAPI** and gives investment insights.
*   **Travel Agent**: Plans entire trips! Flights, hotels, and activities, all synced to my Google Calendar.
*   **Research Agent**: My go-to deep researcher. It searches the live web (via SerpAPI) and can also reference private documents (via Supabase RAG).
*   **Research Agent Evals**: A pipeline to grade my Research Agent's answers against a ground truth dataset.
*   **Airbnb Agent**: Scrapes and analyzes Airbnb listings to find the best spots.
*   **Blog Post Agent**: Automates SEO-friendly content creation.
*   **Supabase RAG**: A template for chatting with my own documents using vector search.

---

## Tech Stack

*   **Orchestration**: [n8n](https://n8n.io/)
*   **Brains**: OpenAI (GPT-4o / GPT-4o-mini)
*   **Eyes/Ears**: SerpAPI (Google Search)
*   **Memory**: Supabase (PostgreSQL + pgvector for RAG)

**Credits**
Huge shoutout to **Hamza Farooq** and **Traversaal.ai** for the inspiration and foundation for many of these agentic workflows!
