import { render, screen } from '@testing-library/react'
import App from './App'

test('renders the app shell brand', () => {
  render(<App />)
  expect(screen.getByText(/equity terminal/i)).toBeInTheDocument()
})
