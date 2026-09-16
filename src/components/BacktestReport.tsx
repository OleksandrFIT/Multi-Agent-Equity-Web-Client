import type { BacktestReport } from '../api/types'
import { StatTile } from '../ui/primitives'
import { Card } from '../ui/primitives'
import { EquityCurve } from './EquityCurve'
import { verdictTone, toneVar } from '../ui/tokens'

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
      {report.records && report.records.length > 0 && (
        <Card title="Per-record detail">
          <div className="overflow-x-auto">
            <table className="w-full text-xs tnum">
              <thead>
                <tr style={{ color: 'var(--text-mut)' }}>
                  <th className="py-1 text-left">Ticker</th>
                  <th className="text-left">As of</th>
                  <th className="text-right">Verdict</th>
                  <th className="text-right">Score</th>
                  {Object.keys(report.horizons).map((h) => <th key={h} className="text-right">fwd {h}d</th>)}
                </tr>
              </thead>
              <tbody>
                {report.records.map((r, i) => (
                  <tr key={i} style={{ borderTop: '1px solid var(--border-soft)' }}>
                    <td className="py-1 font-semibold" style={{ color: 'var(--text)' }}>{r.ticker}</td>
                    <td style={{ color: 'var(--text-dim)' }}>{r.as_of}</td>
                    <td className="text-right uppercase" style={{ color: toneVar[verdictTone[r.verdict] ?? 'neutral'] }}>{r.verdict}</td>
                    <td className="text-right" style={{ color: 'var(--text)' }}>{r.score >= 0 ? '+' : ''}{r.score.toFixed(2)}</td>
                    {Object.keys(report.horizons).map((h) => {
                      const v = r.fwd_returns[h]
                      return (
                        <td key={h} className="text-right"
                          style={{ color: v == null ? 'var(--text-mut)' : v >= 0 ? 'var(--bull)' : 'var(--bear)' }}>
                          {v == null ? '—' : `${v >= 0 ? '+' : ''}${(v * 100).toFixed(1)}%`}
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
      <div className="text-xs" style={{ color: 'var(--text-mut)' }}>{report.disclaimer}</div>
    </div>
  )
}
