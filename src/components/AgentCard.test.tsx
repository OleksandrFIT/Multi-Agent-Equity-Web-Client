import { render, screen } from '@testing-library/react'
import { AgentCard } from './AgentCard'

test('renders an opinion agent with stance, rationale, key facts', () => {
  render(<AgentCard event={{ agent: 'technical', opinion: {
    agent: 'technical', stance: 'bullish', score: 0.7, confidence: 0.8,
    rationale: 'golden cross', key_facts: ['RSI 67'], dropped_facts: [], metrics: { rsi14: 67 } } }} />)
  expect(screen.getByText(/technical/i)).toBeInTheDocument()
  expect(screen.getByText(/bullish/i)).toBeInTheDocument()
  expect(screen.getByText(/golden cross/i)).toBeInTheDocument()
  expect(screen.getByText('RSI 67')).toBeInTheDocument()
})

test('renders a skipped agent', () => {
  render(<AgentCard event={{ agent: 'sentiment', skipped: true, reason: 'no news' }} />)
  expect(screen.getByText(/sentiment/i)).toBeInTheDocument()
  expect(screen.getByText(/no news/i)).toBeInTheDocument()
})
