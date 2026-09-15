import { render, screen } from '@testing-library/react'
import * as client from '../api/client'
import { PricePanel } from './PricePanel'

vi.mock('./PriceChart', () => ({ PriceChart: () => <div>price-chart</div> }))
vi.mock('./RsiChart', () => ({ RsiChart: () => <div>rsi-chart</div> }))

test('fetches prices and renders charts', async () => {
  vi.spyOn(client, 'getPrices').mockResolvedValue({
    ticker: 'AAPL', period: '6M',
    candles: [{ time: '2026-01-02', value: 100 }], sma50: [], sma200: [], rsi: [],
  })
  render(<PricePanel ticker="AAPL" />)
  expect(await screen.findByText('price-chart')).toBeInTheDocument()
  expect(screen.getByText('rsi-chart')).toBeInTheDocument()
})

test('shows a loading indicator while fetching', async () => {
  let resolve: (v: any) => void = () => {}
  vi.spyOn(client, 'getPrices').mockReturnValue(new Promise((r) => { resolve = r }))
  render(<PricePanel ticker="AAPL" />)
  expect(screen.getByTestId('prices-loading')).toBeInTheDocument()
  resolve({ ticker: 'AAPL', period: '6M', candles: [{ time: '2026-01-02', value: 1 }], sma50: [], sma200: [], rsi: [] })
  expect(await screen.findByText('price-chart')).toBeInTheDocument()
})
