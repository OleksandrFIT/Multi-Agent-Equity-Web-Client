import { useMemo, useRef, useState } from 'react'
import { getResolve, streamSSE } from '../api/client'
import type { AgentEvent, Verdict } from '../api/types'
import { AgentCard } from '../components/AgentCard'
import { VerdictCard } from '../components/VerdictCard'
import { TickerInput } from '../components/TickerInput'
import { ProgressRail } from '../components/ProgressRail'
import { PricePanel } from '../components/PricePanel'
import { TickerTape } from '../components/TickerTape'

export function Analyze() {
  const [events, setEvents] = useState<AgentEvent[]>([])
  const [verdict, setVerdict] = useState<Verdict | null>(null)
  const [running, setRunning] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [notice, setNotice] = useState<string | null>(null)
  const [ticker, setTicker] = useState<string | null>(null)
  const esRef = useRef<EventSource | null>(null)

  const done = useMemo(() => new Set(events.map((e) => e.agent)), [events])

  const analyze = (t: string) => {
    esRef.current?.close()
    setEvents([]); setVerdict(null); setError(null); setRunning(true); setTicker(t)
    esRef.current = streamSSE(`/api/analyze?ticker=${encodeURIComponent(t)}`, {
      agent: (d) => setEvents((prev) => [...prev, d]),
      verdict: (d) => setVerdict(d),
      error: (d) => setError(d.message ?? 'error'),
    }, () => setRunning(false))
  }

  const run = async (query: string) => {
    setNotice(null); setError(null)
    let r
    try {
      r = await getResolve(query)
    } catch {
      setError('Could not verify the ticker — try again.')
      return
    }
    if (!r.resolved) {
      setTicker(null); setVerdict(null); setEvents([])
      setNotice(`No such stock found for “${query}” — the name may be incorrect.`)
      return
    }
    if (r.corrected) setNotice(`Showing ${r.resolved} (you typed ${r.input}).`)
    analyze(r.resolved)
  }

  return (
    <div className="space-y-4">
      <TickerTape onSelect={run} />
      <TickerInput onSubmit={run} disabled={running} />
      {notice && <div className="text-sm" style={{ color: 'var(--accent)' }}>{notice}</div>}
      {error && <div className="text-sm" style={{ color: 'var(--bear)' }}>{error}</div>}
      {ticker && <PricePanel ticker={ticker} />}
      {(running || events.length > 0) && !verdict && <ProgressRail done={done} running={running} />}
      {!verdict && <div className="space-y-3">{events.map((e, i) => <AgentCard key={i} event={e} />)}</div>}
      {verdict && <VerdictCard verdict={verdict} />}
    </div>
  )
}
