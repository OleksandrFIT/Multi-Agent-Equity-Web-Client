import { getNews } from './client'

test('getNews posts the query', async () => {
  const body = { query: 'Apple', resolved: 'AAPL', corrected: false, items: [], fetched: 0, added: 0 }
  const spy = vi.spyOn(globalThis, 'fetch').mockResolvedValue(
    new Response(JSON.stringify(body), { status: 200 }) as any)
  const out = await getNews('Apple')
  expect(spy).toHaveBeenCalledWith('/api/news', expect.objectContaining({ method: 'POST' }))
  expect(out.resolved).toBe('AAPL')
  spy.mockRestore()
})
