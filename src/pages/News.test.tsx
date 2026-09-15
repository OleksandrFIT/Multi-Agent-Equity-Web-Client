import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import * as client from '../api/client'
import { News } from './News'

test('shows news list with a stored-new count', async () => {
  vi.spyOn(client, 'getNews').mockResolvedValue({
    query: 'Apple', resolved: 'AAPL', corrected: false, fetched: 1, added: 1,
    items: [{ title: 'Apple beats earnings', url: 'https://x/1', source: 'yfinance', published_at: '2026-09-10' }],
  })
  render(<News />)
  await userEvent.type(screen.getByPlaceholderText(/company or ticker/i), 'Apple')
  await userEvent.click(screen.getByRole('button', { name: /go/i }))
  expect(await screen.findByText('Apple beats earnings')).toBeInTheDocument()
  expect(screen.getByText(/stored 1 new/i)).toBeInTheDocument()
})

test('shows not-found when unresolved', async () => {
  vi.spyOn(client, 'getNews').mockResolvedValue({
    query: 'ZZZZ', resolved: null, corrected: false, fetched: 0, added: 0, items: [],
  })
  render(<News />)
  await userEvent.type(screen.getByPlaceholderText(/company or ticker/i), 'ZZZZ')
  await userEvent.click(screen.getByRole('button', { name: /go/i }))
  expect(await screen.findByText(/no such stock/i)).toBeInTheDocument()
})
