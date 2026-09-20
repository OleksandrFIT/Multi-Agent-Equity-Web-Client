# Multi-Agent Equity Research — Web Client

A dark, fintech-terminal UI for the multi-agent equity-research system. Built with
**React 19 + TypeScript + Vite**, **Tailwind CSS v4**, **lightweight-charts** (TradingView), and
**Vitest** + Testing Library. Talks to the FastAPI backend over REST and **Server-Sent Events**, so
agent opinions and backtest progress stream in live.

## Features

- **Analyze** — a scrolling **ticker tape** of 50 large caps (live price + % change, click to
  analyze), a smart search that resolves typos/company names to a valid symbol (e.g. `APPL → AAPL`,
  `Ford → F`) or says the ticker is unknown. On run: a **price chart** with SMA-50/200 overlays and
  1M/3M/6M/1Y timeframes, an **RSI sub-chart**, a live **progress rail** of the four agents,
  redesigned **agent cards** (stance, score bar, confidence meter, metric gauges, key-fact chips,
  self-critique notes), and a **verdict card** with a risk-caution callout and a
  confidence-calibration note.
- **Backtest** — runs the historical backtest with streamed progress, then KPI stat-tiles per
  horizon (IC, hit rate, mean return), an equity/long-short curve, and a per-record table
  (ticker × date → verdict → forward returns).
- **News** — enter a company name or ticker; recent news is fetched and stored in the vector store,
  and the headlines are shown as links.

The interface is fully themeable (light/dark), responsive down to phone width, and accessible.

## Run

```bash
npm install
npm run dev        # http://localhost:5173
```

Requires the API running on `http://localhost:8000` (see the backend repository). In dev, requests to
`/api` are proxied to the backend.

## Build / test

```bash
npm run build
npm test
```

## Project layout

```
src/
  api/          typed client (REST + SSE) and shared types
  ui/           design-system tokens and primitives (Card, Pill, ScoreBar, Meter, Gauge, StatTile…)
  components/   charts (PriceChart, RsiChart, EquityCurve), ticker tape, agent/verdict cards, …
  pages/        Analyze, Backtest, News
```

Charts are thin wrappers around lightweight-charts (canvas), so they are verified with mount tests
plus live checks; the rest of the UI is unit-tested with Vitest + Testing Library.
