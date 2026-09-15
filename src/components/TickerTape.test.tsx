import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import * as client from '../api/client'
import { TickerTape } from './TickerTape'

test('renders quotes and reports a click', async () => {
  vi.spyOn(client, 'getQuotes').mockResolvedValue([
    { ticker: 'AAPL', price: 210.5, change_pct: 1.2 },
    { ticker: 'MSFT', price: 400.0, change_pct: -0.8 },
  ])
  const onSelect = vi.fn()
  render(<TickerTape onSelect={onSelect} />)
  const aapl = await screen.findAllByText(/AAPL/)
  await userEvent.click(aapl[0])
  expect(onSelect).toHaveBeenCalledWith('AAPL')
})
