import { render, screen } from '@testing-library/react'
import { VerdictCard } from './VerdictCard'

const v = {
  ticker: 'AAPL', as_of: '2026-09-15', verdict: 'buy' as const, score: 0.42,
  confidence: 0.7, narrative: 'Looks strong.', opinions: [], disclaimer: 'not advice',
  caution: 'Elevated risk', skipped_agents: ['sentiment'],
  skip_reasons: { sentiment: 'no news' },
}

test('renders verdict headline, caution and disclaimer', () => {
  render(<VerdictCard verdict={v} />)
  expect(screen.getByText('AAPL')).toBeInTheDocument()
  expect(screen.getByText(/BUY/i)).toBeInTheDocument()
  expect(screen.getByText(/Elevated risk/i)).toBeInTheDocument()
  expect(screen.getByText(/not advice/i)).toBeInTheDocument()
})

test('renders unknown-ticker state without a verdict badge', () => {
  render(<VerdictCard verdict={{ ...v, status: 'unknown_ticker', narrative: 'No price data for ZZZZ.', opinions: [] }} />)
  expect(screen.getAllByText(/unknown or delisted|no price data|unknown ticker/i)[0]).toBeInTheDocument()
  expect(screen.queryByText(/^BUY$/i)).toBeNull()
})

test('renders insufficient-data state', () => {
  render(<VerdictCard verdict={{ ...v, status: 'insufficient_data', opinions: [] }} />)
  expect(screen.getByText(/insufficient data/i)).toBeInTheDocument()
})
