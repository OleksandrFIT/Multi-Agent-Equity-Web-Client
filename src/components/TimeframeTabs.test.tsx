import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TimeframeTabs } from './TimeframeTabs'

test('renders periods and reports selection', async () => {
  const onChange = vi.fn()
  render(<TimeframeTabs value="6M" onChange={onChange} />)
  expect(screen.getByRole('button', { name: '6M' })).toBeInTheDocument()
  await userEvent.click(screen.getByRole('button', { name: '1Y' }))
  expect(onChange).toHaveBeenCalledWith('1Y')
})
