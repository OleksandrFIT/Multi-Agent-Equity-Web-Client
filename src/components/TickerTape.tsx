import { useEffect, useState } from 'react'
import { getQuotes } from '../api/client'
import type { Quote } from '../api/types'
import { TOP50 } from '../ui/top50'

export function TickerTape({ onSelect }: { onSelect: (t: string) => void }) {
  const [quotes, setQuotes] = useState<Quote[] | null>(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    let alive = true
    getQuotes(TOP50)
      .then((q) => { if (alive) setQuotes(q) })
      .catch(() => { if (alive) setFailed(true) })
    return () => { alive = false }
  }, [])

  if (failed) return <div className="text-xs" style={{ color: 'var(--text-mut)' }}>quotes unavailable</div>
  if (!quotes || quotes.length === 0) return <div className="h-8" />

  const row = (key: string) => (
    <div key={key} className="flex shrink-0 gap-4 pr-4" aria-hidden={key === 'b'}>
      {quotes.map((q) => {
        const up = q.change_pct >= 0
        return (
          <button key={key + q.ticker} onClick={() => onSelect(q.ticker)}
            className="flex shrink-0 items-center gap-2 rounded-md px-2 py-1 text-xs tnum"
            style={{ background: 'var(--surface-2)', border: '1px solid var(--border-soft)' }}>
            <span className="font-semibold" style={{ color: 'var(--text)' }}>{q.ticker}</span>
            <span style={{ color: 'var(--text-dim)' }}>${q.price.toFixed(2)}</span>
            <span style={{ color: up ? 'var(--bull)' : 'var(--bear)' }}>
              {up ? '▲' : '▼'} {Math.abs(q.change_pct).toFixed(2)}%
            </span>
          </button>
        )
      })}
    </div>
  )

  return (
    <div className="tape-mask overflow-hidden rounded-lg" style={{ border: '1px solid var(--border-soft)' }}>
      <div className="tape-track flex w-max">
        {row('a')}
        {row('b')}
      </div>
    </div>
  )
}
