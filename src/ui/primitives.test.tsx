import { render, screen } from '@testing-library/react'
import { Card, Pill, ScoreBar, Meter, Chip, StatTile } from './primitives'

test('Card renders children and title', () => {
  render(<Card title="Fundamentals"><span>body</span></Card>)
  expect(screen.getByText('Fundamentals')).toBeInTheDocument()
  expect(screen.getByText('body')).toBeInTheDocument()
})

test('Pill shows label and stance class', () => {
  const { container } = render(<Pill tone="bull">bullish</Pill>)
  expect(screen.getByText('bullish')).toBeInTheDocument()
  expect(container.querySelector('[data-tone="bull"]')).not.toBeNull()
})

test('ScoreBar places marker by score (-1..1)', () => {
  const { container } = render(<ScoreBar score={0.5} />)
  const marker = container.querySelector('[data-testid="score-marker"]') as HTMLElement
  expect(marker.style.left).toBe('75%')  // (0.5+1)/2*100
})

test('Meter width reflects fraction', () => {
  const { container } = render(<Meter value={0.8} />)
  const fill = container.querySelector('[data-testid="meter-fill"]') as HTMLElement
  expect(fill.style.width).toBe('80%')
})

test('StatTile shows label and value', () => {
  render(<StatTile label="IC" value="0.123" />)
  expect(screen.getByText('IC')).toBeInTheDocument()
  expect(screen.getByText('0.123')).toBeInTheDocument()
})

test('Chip renders text', () => {
  render(<Chip>RSI 67</Chip>)
  expect(screen.getByText('RSI 67')).toBeInTheDocument()
})
