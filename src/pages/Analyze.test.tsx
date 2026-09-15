import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import * as client from '../api/client'
import { Analyze } from './Analyze'

vi.mock('../components/TickerTape', () => ({ TickerTape: () => <div>tape</div> }))
vi.mock('../components/PricePanel', () => ({ PricePanel: () => <div>price-panel</div> }))

test('analyze page shows a ticker input', () => {
  render(<Analyze />)
  expect(screen.getByPlaceholderText(/ticker/i)).toBeInTheDocument()
})

test('corrects a mistyped ticker before analyzing', async () => {
  vi.spyOn(client, 'getResolve').mockResolvedValue({ input: 'APPL', resolved: 'AAPL', corrected: true })
  const stream = vi.spyOn(client, 'streamSSE').mockReturnValue({ close() {} } as any)
  render(<Analyze />)
  await userEvent.type(screen.getByPlaceholderText(/ticker/i), 'APPL')
  await userEvent.click(screen.getByRole('button', { name: /go/i }))
  expect(await screen.findByText(/AAPL/)).toBeInTheDocument()  // correction note
  expect(stream).toHaveBeenCalledWith(expect.stringContaining('ticker=AAPL'), expect.anything(), expect.anything())
})

test('shows not-found for an unresolvable query', async () => {
  vi.spyOn(client, 'getResolve').mockResolvedValue({ input: 'ZZZZ', resolved: null, corrected: false })
  render(<Analyze />)
  await userEvent.type(screen.getByPlaceholderText(/ticker/i), 'ZZZZ')
  await userEvent.click(screen.getByRole('button', { name: /go/i }))
  expect(await screen.findByText(/not.*found|no such|не знайшл/i)).toBeInTheDocument()
})
