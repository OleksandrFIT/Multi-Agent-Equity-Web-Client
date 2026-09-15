import { render, screen } from '@testing-library/react'
import { EquityCurve } from './EquityCurve'

const setData = vi.fn()
const addLineSeries = vi.fn(() => ({ setData }))
vi.mock('lightweight-charts', () => ({
  createChart: () => ({ addLineSeries, timeScale: () => ({ fitContent: vi.fn() }), applyOptions: vi.fn(), remove: vi.fn() }),
  ColorType: { Solid: 'solid' },
}))

test('feeds cumulative curve', () => {
  render(<EquityCurve curve={[0.1, -0.05, 0.2]} />)
  expect(addLineSeries).toHaveBeenCalled()
  expect(setData).toHaveBeenCalled()
})

test('empty curve shows no data', () => {
  render(<EquityCurve curve={[]} />)
  expect(screen.getByText(/no data/i)).toBeInTheDocument()
})
