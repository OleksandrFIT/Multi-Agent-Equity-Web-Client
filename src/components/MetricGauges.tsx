import { Gauge } from '../ui/Gauge'

interface Spec { label: string; min: number; max: number; format: (v: number) => string; tone?: string }

const pct = (v: number) => `${(v * 100).toFixed(0)}%`
const num = (v: number) => v.toFixed(1)

// Only metrics with a spec are drawn; everything else is left to key-facts chips.
const SPECS: Record<string, Spec> = {
  pe: { label: 'P/E', min: 0, max: 50, format: num },
  roe: { label: 'ROE', min: 0, max: 0.5, format: pct, tone: 'var(--bull)' },
  debt_to_equity: { label: 'D/E', min: 0, max: 3, format: num },
  revenue_growth: { label: 'Rev growth', min: -0.2, max: 0.5, format: pct },
  volatility: { label: 'Volatility', min: 0, max: 1, format: pct, tone: 'var(--neutral)' },
  max_drawdown: { label: 'Max drawdown', min: 0, max: 1, format: pct, tone: 'var(--bear)' },
  beta: { label: 'Beta', min: 0, max: 2.5, format: num },
  rsi14: { label: 'RSI', min: 0, max: 100, format: (v) => v.toFixed(0) },
  trend_pct: { label: 'Trend', min: -30, max: 30, format: (v) => `${v >= 0 ? '+' : ''}${v.toFixed(0)}%` },
}

export function MetricGauges({ metrics }: { metrics: Record<string, number> }) {
  const items = Object.entries(metrics)
    .map(([k, v]) => [SPECS[k], v] as const)
    .filter(([spec]) => spec != null)
  if (items.length === 0) return null
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
      {items.map(([spec, v]) => (
        <Gauge key={spec!.label} label={spec!.label} value={v} min={spec!.min} max={spec!.max}
          format={spec!.format} tone={spec!.tone} />
      ))}
    </div>
  )
}
