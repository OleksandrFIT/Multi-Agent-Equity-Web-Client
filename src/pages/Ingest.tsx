import { useState } from 'react'
import { postJSON } from '../api/client'
import { TickerInput } from '../components/TickerInput'

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
      <TickerInput onSubmit={run} disabled={busy} />
      {msg && <div className="text-sm text-gray-700">{msg}</div>}
    </div>
  )
}
