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
