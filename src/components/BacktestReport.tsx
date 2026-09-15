import type { BacktestReport } from '../api/types'
import { LongShortCurve } from './LongShortCurve'

const pct = (v: number) => `${v >= 0 ? '+' : ''}${(v * 100).toFixed(1)}%`

export function BacktestReportView({ report }: { report: BacktestReport }) {
  return (
    <div className="space-y-4">
      <div className="text-sm text-gray-500">{report.n_records} verdicts</div>
      {Object.entries(report.horizons).map(([h, m]) => (
        <div key={h} className="rounded-xl border border-gray-200 p-3">
          <div className="font-medium">Horizon {h} trading days (n={m.n})</div>
          <div className="text-sm text-gray-700">
            Information coefficient: {m.ic === null ? 'n/a' : m.ic.toFixed(3)}
          </div>
          <div className="text-sm text-gray-700">
            Hit rate: {Object.entries(m.hit_rate).map(([k, v]) => `${k} ${Math.round(v * 100)}%`).join(', ') || 'n/a'}
          </div>
          <div className="text-sm text-gray-700">
            Mean return: {Object.entries(m.mean_return).map(([k, v]) => `${k} ${pct(v)}`).join(', ') || 'n/a'}
          </div>
          <div className="mt-2"><LongShortCurve curve={m.long_short_curve} /></div>
        </div>
      ))}
      <div className="text-xs text-gray-400">{report.disclaimer}</div>
    </div>
  )
}
