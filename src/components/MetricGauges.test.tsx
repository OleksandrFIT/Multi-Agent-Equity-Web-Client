import { render, screen } from '@testing-library/react'
import { MetricGauges } from './MetricGauges'

test('renders gauges for known metric keys only', () => {
  render(<MetricGauges metrics={{ pe: 24, roe: 0.3, volatility: 0.22, unknown_key: 9 }} />)
  expect(screen.getByText('P/E')).toBeInTheDocument()
  expect(screen.getByText('ROE')).toBeInTheDocument()
  expect(screen.getByText('Volatility')).toBeInTheDocument()
  expect(screen.queryByText(/unknown_key/i)).toBeNull()
})

test('renders nothing when no known metrics', () => {
  const { container } = render(<MetricGauges metrics={{ foo: 1 }} />)
  expect(container.firstChild).toBeNull()
})
