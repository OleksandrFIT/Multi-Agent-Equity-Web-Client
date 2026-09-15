import { getJSON } from './client'

test('getJSON parses a JSON response', async () => {
  const fake = { ok: true } as Response
  ;(fake as any).json = async () => ({ model: 'qwen2.5:7b' })
  vi.stubGlobal('fetch', vi.fn(async () => fake))
  const data = await getJSON<{ model: string }>('/api/health')
  expect(data.model).toBe('qwen2.5:7b')
})
