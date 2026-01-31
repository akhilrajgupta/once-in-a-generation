# CLAUDE.md

## Project Overview

**Akhil's Agent Playground** — a multi-agent AI automation sandbox built primarily on **n8n** workflows, with complementary **React** frontends. The repository contains 10 distinct agent projects that connect various AI models and external APIs to solve real-world tasks (finance research, travel planning, content generation, calorie tracking, etc.).

## Repository Structure

```
once-in-a-generation/
├── airbnb-agent/               # Airbnb listing search (n8n + React/Vite frontend)
├── blog_post_agent/            # SEO blog generation (n8n + React/Vite frontend)
├── calorie-counting-agent/     # Meal/calorie tracker (React/Vite + Supabase)
├── email-label-agent/          # Gmail email parsing (n8n)
├── finance-agent/              # Financial analysis (n8n + React/Vite frontend)
├── research-agent/             # Web search + document RAG (n8n)
├── research_agent_evals/       # Evaluation pipeline for research agent (n8n)
├── supabase-rag-agent/         # Vector store chatbot template (n8n)
├── travel-agent/               # Trip planning + Google Calendar sync (n8n)
├── whiteboard/                 # Design artifacts (Excalidraw)
└── README.md
```

## Tech Stack

| Layer | Technologies |
|-------|-------------|
| **Orchestration** | n8n (workflow JSON files), Model Context Protocol (MCP) |
| **AI/LLMs** | OpenAI GPT-4o / GPT-4o-mini, OpenAI Embeddings |
| **Frontend** | React 18, Vite 5, TypeScript 5.5+, Tailwind CSS 3.4+ |
| **UI Components** | Shadcn/ui (Radix UI primitives), Lucide icons, Sonner toasts |
| **State Management** | TanStack React Query, React Hook Form + Zod, React Context |
| **Database** | Supabase (PostgreSQL + pgvector for RAG) |
| **External APIs** | SerpAPI, Gmail, Google Sheets, Google Drive, Google Calendar |
| **Package Manager** | npm (ES modules) |

## Development Commands

All React projects share these commands:

```bash
npm install          # Install dependencies
npm run dev          # Start dev server (Vite, port 8080)
npm run build        # Production build
npm run build:dev    # Development build
npm run lint         # Run ESLint
npm run preview      # Preview production build
```

Dev server runs on port **8080** with HMR enabled.

## React Project Conventions

### File Organization (consistent across all React apps)

```
src/
├── components/          # React components
│   └── ui/             # Shadcn UI primitives
├── contexts/           # React Context providers (Auth, etc.)
├── hooks/              # Custom hooks (use* prefix)
├── lib/                # Utilities (cn() helper, etc.)
├── pages/              # Route-level components
├── integrations/       # External service clients (Supabase)
├── App.tsx             # Root component with routes
├── main.tsx            # Entry point
└── index.css           # Global styles + CSS variables (light/dark)
```

### Naming

- **Components**: PascalCase (`CalorieRing.tsx`, `AddMealSheet.tsx`)
- **Hooks**: camelCase with `use` prefix (`useMeals.ts`, `useAuth.ts`)
- **Types/Props**: Suffixed with `Props` (`CalorieRingProps`)
- **Routes**: lowercase (`/dashboard`, `/settings`, `/log`)

### Styling

- Tailwind CSS with HSL-based CSS custom properties for theming
- Dark mode via `dark` class on `<html>`
- `class-variance-authority` for component variant APIs
- Mobile-first responsive design with safe-area insets
- Fonts: DM Sans (default), Crimson Pro (serif), SF Mono (mono)

### Data Fetching Pattern

- Custom hooks wrapping `useQuery` / `useMutation` from TanStack React Query
- Hierarchical query keys: `["meals", date, user?.id]`
- Error feedback via Sonner toast notifications

### Path Aliases

All projects use `@/*` mapped to `./src/*` (configured in `tsconfig.json` and `vite.config.ts`).

### TypeScript

- Strict mode is **disabled** (`"strict": false`)
- Target: ESNext, JSX: `react-jsx` (no explicit React imports needed)
- Module resolution: `bundler`

## n8n Workflow Agents

Most agents are defined as **n8n workflow JSON files** at the root of each agent directory. These contain node definitions, connections, and credential references.

| Agent | Workflow File(s) |
|-------|-----------------|
| Airbnb | `airbnb_agent.json` |
| Blog Post | `blog_post_generator.json`, `blog_deep_research.json`, `scrape_link.json` |
| Calorie Counting | `backend/` directory |
| Finance | `Finance_Agent_Dev.json` |
| Research | `lisa.json` |
| Research Evals | `research_agent_evaluation.json` |
| Supabase RAG | `supabse_rag_with_comments.json` |
| Travel | `Travel Agent With MCP.json` |

## Environment Variables

Frontend apps use the `VITE_` prefix (required by Vite for client-side access):

| Variable | Purpose |
|----------|---------|
| `VITE_SUPABASE_URL` | Supabase project URL |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Supabase public API key |
| `VITE_SUPABASE_PROJECT_ID` | Supabase project ID |

## Database

- **Supabase** with PostgreSQL and the `pgvector` extension for vector embeddings
- Migrations live in `supabase/migrations/` within relevant agent directories
- Config in `supabase/config.toml`

## Key Patterns for AI Assistants

1. **Each agent is self-contained** — work within the relevant agent directory; don't cross-pollinate dependencies.
2. **n8n workflows are JSON** — edits to agent logic happen in `.json` workflow files, not code.
3. **React frontends share identical tooling** — Vite, Tailwind, Shadcn/ui, and the same `tsconfig` / `eslint` setup across all apps.
4. **Supabase is the backend** — auth, database, and vector storage all go through the Supabase JS SDK.
5. **No strict TypeScript** — the codebase prioritizes velocity; don't introduce strict-mode changes.
6. **npm only** — do not use yarn or pnpm; `package-lock.json` files are committed.
7. **Port 8080** — all dev servers bind to port 8080.
8. **Component library** — prefer existing Shadcn/ui components from `@/components/ui` over custom implementations.
