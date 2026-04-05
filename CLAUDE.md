# Project: bagel_dashboard

## Overview
A Next.js web dashboard that visualizes live production metrics from `mcp_server_bagel` and lets users trigger pre-built incident scenarios with one click. Auto-refreshes every 5 seconds.

## Tech Stack
- Next.js 16.2.2 (App Router)
- React 19.2.4
- TypeScript 5
- Tailwind CSS 4
- ESLint (eslint-config-next)

## Architecture Notes
- `app/page.tsx` — main dashboard: incident trigger buttons + live metric cards
- `app/mcp-url/page.tsx` — helper page showing MCP server URL for Claude Code config
- `app/components/Nav.tsx` — top navigation
- MCP server URL resolved via `NEXT_PUBLIC_MCP_URL` env var; defaults to `https://bagelmcpserver-production.up.railway.app`
- Dashboard polls `GET /status` every 5 seconds using `setInterval` in a `useEffect`

## Commands
- `npm run dev` — start dev server (port 3000)
- `npm run build` — production build
- `npm start` — serve production build
- `npm run lint` — run ESLint

## Conventions
- Use App Router conventions — no `pages/` directory
- Components go in `app/components/`
- Keep API calls (fetch to MCP server) inside `page.tsx` — no separate API route needed
- Tailwind utility classes only — no custom CSS files

## Do Not
- Do not add a backend API route (`app/api/`) — the dashboard talks directly to `mcp_server_bagel`
- Do not hardcode the MCP server URL — always use `NEXT_PUBLIC_MCP_URL`
- Do not add state management libraries (Redux, Zustand) — React state is sufficient
- Do not add authentication — this is a hackathon demo
