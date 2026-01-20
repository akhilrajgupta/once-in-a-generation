# Blog Post Agent

Automates the creation of high-quality, SEO-optimized blog content.

## Key Features
*   **Deep Research**: Scrapes and analyzes content before writing.
*   **Modular Design**: Uses sub-workflows for scraping and research.
*   **Draft Generation**: Produces full blog drafts based on topics/prompts.

## Setup
1.  **Import Workflows**:
    *   `blog_post_generator.json` (Main)
    *   `blog_deep_research.json` (Sub-workflow)
    *   `scrape_link.json` (Sub-workflow)
2.  **Credentials**: Configure **OpenAI** and any other required service credentials in n8n.
