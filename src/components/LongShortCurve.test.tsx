import { render } from '@testing-library/react'
import { LongShortCurve } from './LongShortCurve'

test('renders a polyline with one point per value', () => {
  const { container } = render(<LongShortCurve curve={[0.1, -0.1, 0.2]} />)
  const poly = container.querySelector('polyline')
  expect(poly).not.toBeNull()
  expect(poly!.getAttribute('points')!.trim().split(/\s+/).length).toBe(3)
})

test('renders empty state for no data', () => {
  const { container } = render(<LongShortCurve curve={[]} />)
  expect(container.querySelector('polyline')).toBeNull()
})
