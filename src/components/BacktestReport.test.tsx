import { render, screen } from '@testing-library/react'
import { BacktestReportView } from './BacktestReport'

const report = {
  n_records: 2, disclaimer: 'small sample',
  horizons: {
    '21': { n: 2, hit_rate: { buy: 0.5 }, mean_return: { buy: 0.03 }, ic: 0.2, long_short_curve: [0.1, -0.1] },
    '63': { n: 2, hit_rate: {}, mean_return: {}, ic: null, long_short_curve: [] },
  },
}

test('renders horizons and IC', () => {
  render(<BacktestReportView report={report} />)
  expect(screen.getByText(/21/)).toBeInTheDocument()
  expect(screen.getByText(/63/)).toBeInTheDocument()
  expect(screen.getAllByText(/information coefficient/i).length).toBeGreaterThan(0)
})
