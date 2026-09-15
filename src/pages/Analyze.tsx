import { useRef, useState } from 'react'
import { streamSSE } from '../api/client'
import type { AgentEvent, Verdict } from '../api/types'
import { AgentCard } from '../components/AgentCard'
import { VerdictCard } from '../components/VerdictCard'
import { TickerInput } from '../components/TickerInput'

export function Analyze() {
  const [events, setEvents] = useState<AgentEvent[]>([])
  const [verdict, setVerdict] = useState<Verdict | null>(null)
  const [running, setRunning] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const esRef = useRef<EventSource | null>(null)

  const run = (ticker: string) => {
    esRef.current?.close()
    setEvents([]); setVerdict(null); setError(null); setRunning(true)
    esRef.current = streamSSE(`/api/analyze?ticker=${encodeURIComponent(ticker)}`, {
      agent: (d) => setEvents((prev) => [...prev, d]),
      verdict: (d) => setVerdict(d),
      error: (d) => setError(d.message ?? 'error'),
    }, () => setRunning(false))
  }

  return (
    <div className="space-y-4">
      <TickerInput onSubmit={run} disabled={running} />
      {error && <div className="text-red-700">{error}</div>}
      {!verdict && events.map((e, i) => <AgentCard key={i} event={e} />)}
      {running && <div className="text-sm text-gray-500">Analyzing… (agents run one by one)</div>}
      {verdict && <VerdictCard verdict={verdict} />}
    </div>
  )
}
