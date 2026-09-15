import { useState } from 'react'
import { streamSSE } from '../api/client'
import type { BacktestReport } from '../api/types'
import { BacktestReportView } from '../components/BacktestReport'

export function Backtest() {
  const [progress, setProgress] = useState<string[]>([])
  const [report, setReport] = useState<BacktestReport | null>(null)
  const [running, setRunning] = useState(false)

  const run = () => {
    setProgress([]); setReport(null); setRunning(true)
    streamSSE('/api/backtest', {
      progress: (d) => setProgress((p) => [...p, `${d.ticker} @ ${d.as_of}`]),
      report: (d) => setReport(d),
      error: (d) => setProgress((p) => [...p, `error: ${d.message}`]),
    }, () => setRunning(false))
  }

  return (
    <div className="space-y-4">
      <button onClick={run} disabled={running}
        className="rounded-lg px-4 py-2 text-sm font-medium disabled:opacity-50"
        style={{ background: 'var(--accent)', color: '#04121f' }}>
        Run backtest
      </button>
      {running && <div className="text-sm" style={{ color: 'var(--text-dim)' }}>Running… {progress.length} done</div>}
      {progress.length > 0 && !report && (
        <ul className="tnum space-y-0.5 text-xs" style={{ color: 'var(--text-mut)' }}>{progress.map((p, i) => <li key={i}>{p}</li>)}</ul>
      )}
      {report && <BacktestReportView report={report} />}
    </div>
  )
}
