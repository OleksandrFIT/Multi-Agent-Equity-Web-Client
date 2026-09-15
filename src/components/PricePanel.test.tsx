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
