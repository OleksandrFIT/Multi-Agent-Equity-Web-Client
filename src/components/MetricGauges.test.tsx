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

test('renders gauges for the new margin/ratio metrics', () => {
  render(<MetricGauges metrics={{ operating_margin: 0.3, net_margin: 0.25, fcf_margin: 0.26, current_ratio: 0.99 }} />)
  expect(screen.getByText('Op margin')).toBeInTheDocument()
  expect(screen.getByText('Net margin')).toBeInTheDocument()
  expect(screen.getByText('Current ratio')).toBeInTheDocument()
})
