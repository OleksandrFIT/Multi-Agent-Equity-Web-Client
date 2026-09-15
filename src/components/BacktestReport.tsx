import type { BacktestReport } from '../api/types'
import { StatTile } from '../ui/primitives'
import { Card } from '../ui/primitives'
import { EquityCurve } from './EquityCurve'

const pct = (v: number) => `${v >= 0 ? '+' : ''}${(v * 100).toFixed(1)}%`

export function BacktestReportView({ report }: { report: BacktestReport }) {
  return (
    <div className="space-y-4">
      <div className="text-sm" style={{ color: 'var(--text-mut)' }}>{report.n_records} verdicts</div>
      {Object.entries(report.horizons).map(([h, m]) => {
        const meanKeys = Object.keys(m.mean_return)
        return (
          <Card key={h} title={`Horizon ${h} trading days (n=${m.n})`}>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              <StatTile label="IC" value={m.ic === null ? 'n/a' : m.ic.toFixed(3)}
                tone={m.ic != null && m.ic > 0 ? 'bull' : m.ic != null && m.ic < 0 ? 'bear' : undefined} />
              {meanKeys.map((k) => (
                <StatTile key={k} label={`Mean ${k}`} value={pct(m.mean_return[k])}
                  tone={m.mean_return[k] >= 0 ? 'bull' : 'bear'} />
              ))}
              {Object.entries(m.hit_rate).map(([k, v]) => (
                <StatTile key={`hit-${k}`} label={`Hit ${k}`} value={`${Math.round(v * 100)}%`} />
              ))}
            </div>
            <div className="mt-3 text-xs uppercase tracking-wide" style={{ color: 'var(--text-mut)' }}>Long-short curve</div>
            <div className="mt-1"><EquityCurve curve={m.long_short_curve} /></div>
          </Card>
        )
      })}
      <div className="text-xs" style={{ color: 'var(--text-mut)' }}>{report.disclaimer}</div>
    </div>
  )
}
