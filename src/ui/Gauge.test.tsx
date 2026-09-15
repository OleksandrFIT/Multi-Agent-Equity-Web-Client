import { render, screen } from '@testing-library/react'
import { Gauge } from './Gauge'

test('Gauge shows label and formatted value', () => {
  render(<Gauge label="RSI" value={67} min={0} max={100} format={(v) => v.toFixed(0)} />)
  expect(screen.getByText('RSI')).toBeInTheDocument()
  expect(screen.getByText('67')).toBeInTheDocument()
})

test('Gauge clamps value into range without throwing', () => {
  const { container } = render(<Gauge label="Vol" value={5} min={0} max={1} format={(v) => v.toFixed(2)} />)
  expect(container.querySelector('svg')).not.toBeNull()
  expect(screen.getByText('5.00')).toBeInTheDocument()
})
