import { render } from '@testing-library/react'
import { PriceChart } from './PriceChart'

const addAreaSeries = vi.fn(() => ({ setData: vi.fn() }))
const addLineSeries = vi.fn(() => ({ setData: vi.fn() }))
vi.mock('lightweight-charts', () => ({
  createChart: () => ({
    addAreaSeries, addLineSeries,
    timeScale: () => ({ fitContent: vi.fn() }),
    applyOptions: vi.fn(), resize: vi.fn(), remove: vi.fn(),
  }),
  ColorType: { Solid: 'solid' },
}))

const prices = {
  ticker: 'AAPL', period: '6M' as const,
  candles: [{ time: '2026-01-02', value: 100 }, { time: '2026-01-03', value: 102 }],
  sma50: [{ time: '2026-01-03', value: 101 }],
  sma200: [],
  rsi: [],
}

test('mounts and feeds price + sma50 series (sma200 empty -> not drawn)', () => {
  render(<PriceChart prices={prices} />)
  expect(addAreaSeries).toHaveBeenCalledTimes(1)   // price
  expect(addLineSeries).toHaveBeenCalledTimes(1)   // sma50 only; sma200 empty
})
