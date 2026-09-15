import { getQuotes, getResolve } from './client'

test('getQuotes joins tickers', async () => {
  const spy = vi.spyOn(globalThis, 'fetch').mockResolvedValue(
    new Response(JSON.stringify([{ ticker: 'AAPL', price: 1, change_pct: 2 }]), { status: 200 }) as any)
  const out = await getQuotes(['AAPL', 'MSFT'])
  expect(spy).toHaveBeenCalledWith('/api/quotes?tickers=AAPL%2CMSFT')
  expect(out[0].ticker).toBe('AAPL')
  spy.mockRestore()
})

test('getResolve passes the query', async () => {
  const spy = vi.spyOn(globalThis, 'fetch').mockResolvedValue(
    new Response(JSON.stringify({ input: 'APPL', resolved: 'AAPL', corrected: true }), { status: 200 }) as any)
  const out = await getResolve('APPL')
  expect(out.resolved).toBe('AAPL')
  spy.mockRestore()
})
