import { render, screen } from '@testing-library/react'
import { BacktestReportView } from './BacktestReport'

vi.mock('./EquityCurve', () => ({ EquityCurve: () => <div>curve</div> }))

const report = {
  n_records: 2, disclaimer: 'small sample',
  horizons: {
    '21': { n: 2, hit_rate: { buy: 0.5 }, mean_return: { buy: 0.03 }, ic: 0.2, long_short_curve: [0.1, -0.1] },
    '63': { n: 2, hit_rate: {}, mean_return: {}, ic: null, long_short_curve: [] },
  },
}

test('renders horizons, IC tile, and curve', () => {
  render(<BacktestReportView report={report} />)
  expect(screen.getByText(/Horizon 21 trading days/i)).toBeInTheDocument()
  expect(screen.getByText(/Horizon 63 trading days/i)).toBeInTheDocument()
  expect(screen.getAllByText('IC').length).toBeGreaterThan(0)
  expect(screen.getByText('0.200')).toBeInTheDocument()   // ic formatted
  expect(screen.getAllByText('curve').length).toBeGreaterThan(0)
})
