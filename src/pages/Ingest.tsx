import { useState } from 'react'
import { postJSON } from '../api/client'
import { TickerInput } from '../components/TickerInput'
import { Card } from '../ui/primitives'

export function Ingest() {
  const [msg, setMsg] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const run = async (ticker: string) => {
    setBusy(true); setMsg(null)
    try {
      const r = await postJSON<{ ticker: string; ingested: number }>('/api/ingest', { ticker })
      setMsg(`Ingested ${r.ingested} news items for ${r.ticker}`)
    } catch (e) {
      setMsg(`Error: ${(e as Error).message}`)
    } finally { setBusy(false) }
  }
  return (
    <div className="space-y-3">
      <Card title="Ingest news + filings">
        <TickerInput onSubmit={run} disabled={busy} />
        {msg && <div className="mt-3 text-sm" style={{ color: 'var(--text-dim)' }}>{msg}</div>}
      </Card>
    </div>
  )
}
