import { getPrices } from './client'

test('getPrices requests the endpoint and returns parsed json', async () => {
  const body = { ticker: 'AAPL', period: '6M',
    candles: [{ time: '2026-01-02', value: 100 }], sma50: [], sma200: [], rsi: [] }
  const spy = vi.spyOn(globalThis, 'fetch').mockResolvedValue(
    new Response(JSON.stringify(body), { status: 200 }) as any)
  const out = await getPrices('aapl', '6M')
  expect(spy).toHaveBeenCalledWith('/api/prices?ticker=AAPL&period=6M')
  expect(out.candles[0].value).toBe(100)
  spy.mockRestore()
})
