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
      <button onClick={run} disabled={running} className="rounded-lg bg-blue-600 px-4 py-2 text-white disabled:opacity-50">
        Run backtest
      </button>
      {running && <div className="text-sm text-gray-500">Running… {progress.length} done</div>}
      {progress.length > 0 && !report && (
        <ul className="text-xs text-gray-500">{progress.map((p, i) => <li key={i}>{p}</li>)}</ul>
      )}
      {report && <BacktestReportView report={report} />}
    </div>
  )
}
