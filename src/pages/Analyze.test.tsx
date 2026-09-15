import { render, screen } from '@testing-library/react'
import { Analyze } from './Analyze'

test('analyze page shows a ticker input', () => {
  render(<Analyze />)
  expect(screen.getByPlaceholderText(/ticker/i)).toBeInTheDocument()
})
