# Multi-Agent Equity Research — Web Client

React + TypeScript (Vite) UI for the equity-research API.

## Run
    npm install
    npm run dev        # http://localhost:5173

Requires the API running on http://localhost:8000 (see the backend repo).
Dev requests to `/api` are proxied to the backend.

## Build / test
    npm run build
    npm test

## Screens
- **Analyze** — enter a ticker; agents stream in one by one, then a verdict.
- **Backtest** — run the historical backtest; metrics per horizon + long-short curve.
- **Ingest** — pull recent news for a ticker into the vector store.
