import { render } from '@testing-library/react'
import { RsiChart } from './RsiChart'

const setData = vi.fn()
const createPriceLine = vi.fn()
const addLineSeries = vi.fn(() => ({ setData, createPriceLine }))
vi.mock('lightweight-charts', () => ({
  createChart: () => ({
    addLineSeries,
    timeScale: () => ({ fitContent: vi.fn() }),
    applyOptions: vi.fn(), remove: vi.fn(),
  }),
  ColorType: { Solid: 'solid' },
}))

test('mounts, feeds rsi, and draws 30/70 bands', () => {
  render(<RsiChart rsi={[{ time: '2026-01-02', value: 55 }]} />)
  expect(addLineSeries).toHaveBeenCalled()
  expect(setData).toHaveBeenCalled()
  expect(createPriceLine).toHaveBeenCalledTimes(2)   // 30 and 70
})

test('renders nothing for empty rsi', () => {
  const { container } = render(<RsiChart rsi={[]} />)
  expect(container.textContent).toContain('no data')
})
