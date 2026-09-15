import { useState, type FormEvent } from 'react'
import { getNews } from '../api/client'
import type { NewsResult } from '../api/types'
import { Card } from '../ui/primitives'

export function News() {
  const [query, setQuery] = useState('')
  const [result, setResult] = useState<NewsResult | null>(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const run = async (e: FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return
    setBusy(true); setError(null); setResult(null)
    try {
      setResult(await getNews(query.trim()))
    } catch {
      setError('Could not fetch news — try again.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="space-y-4">
      <Card title="News">
        <form onSubmit={run} className="flex gap-2">
          <input value={query} onChange={(e) => setQuery(e.target.value)}
            placeholder="Company or ticker (e.g. Apple)"
            className="tnum rounded-lg border px-3 py-2 text-sm outline-none"
            style={{ background: 'var(--surface-2)', borderColor: 'var(--border)', color: 'var(--text)' }} />
          <button disabled={busy} className="rounded-lg px-4 py-2 text-sm font-medium disabled:opacity-50"
            style={{ background: 'var(--accent)', color: '#04121f' }}>Go</button>
        </form>
      </Card>
      {error && <div className="text-sm" style={{ color: 'var(--bear)' }}>{error}</div>}
      {result && result.resolved === null && (
        <div className="text-sm" style={{ color: 'var(--text-dim)' }}>
          No such stock found for “{result.query}” — the name may be incorrect.
        </div>
      )}
      {result && result.resolved && (
        <div className="space-y-3">
          <div className="text-sm" style={{ color: 'var(--text-dim)' }}>
            News for <span style={{ color: 'var(--text)' }}>{result.resolved}</span>
            {result.corrected && <span> (you typed {result.query})</span>}
            {` · fetched ${result.fetched} · stored ${result.added} new`}
          </div>
          {result.items.length === 0 && (
            <div className="text-sm" style={{ color: 'var(--text-mut)' }}>no recent news</div>
          )}
          <div className="space-y-2">
            {result.items.map((a) => (
              <Card key={a.url}>
                <a href={a.url} target="_blank" rel="noopener noreferrer"
                  className="text-sm font-medium" style={{ color: 'var(--accent)' }}>{a.title}</a>
                <div className="mt-1 text-xs" style={{ color: 'var(--text-mut)' }}>{a.source} · {a.published_at}</div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
