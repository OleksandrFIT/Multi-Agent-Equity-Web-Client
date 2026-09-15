import { useMemo, useRef, useState } from 'react'
import { streamSSE } from '../api/client'
import type { AgentEvent, Verdict } from '../api/types'
import { AgentCard } from '../components/AgentCard'
import { VerdictCard } from '../components/VerdictCard'
import { TickerInput } from '../components/TickerInput'
import { ProgressRail } from '../components/ProgressRail'
import { PricePanel } from '../components/PricePanel'

export function Analyze() {
  const [events, setEvents] = useState<AgentEvent[]>([])
  const [verdict, setVerdict] = useState<Verdict | null>(null)
  const [running, setRunning] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [ticker, setTicker] = useState<string | null>(null)
  const esRef = useRef<EventSource | null>(null)

  const done = useMemo(() => new Set(events.map((e) => e.agent)), [events])

  const run = (t: string) => {
    esRef.current?.close()
    setEvents([]); setVerdict(null); setError(null); setRunning(true); setTicker(t)
    esRef.current = streamSSE(`/api/analyze?ticker=${encodeURIComponent(t)}`, {
      agent: (d) => setEvents((prev) => [...prev, d]),
      verdict: (d) => setVerdict(d),
      error: (d) => setError(d.message ?? 'error'),
    }, () => setRunning(false))
  }

  return (
    <div className="space-y-4">
      <TickerInput onSubmit={run} disabled={running} />
      {error && <div className="text-sm" style={{ color: 'var(--bear)' }}>{error}</div>}
      {ticker && <PricePanel ticker={ticker} />}
      {(running || events.length > 0) && !verdict && <ProgressRail done={done} running={running} />}
      {!verdict && <div className="space-y-3">{events.map((e, i) => <AgentCard key={i} event={e} />)}</div>}
      {verdict && <VerdictCard verdict={verdict} />}
    </div>
  )
}
