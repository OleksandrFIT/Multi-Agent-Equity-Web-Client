import type { ReactNode } from 'react'
import { type Tone, toneVar } from './tokens'

export function Card({ title, accent, children }: { title?: ReactNode; accent?: Tone; children: ReactNode }) {
  return (
    <div
      className="rounded-xl border p-4"
      style={{
        background: 'var(--surface)',
        borderColor: 'var(--border)',
        borderLeft: accent ? `3px solid ${toneVar[accent]}` : undefined,
      }}
    >
      {title != null && <div className="mb-2 text-sm font-semibold text-[var(--text)]">{title}</div>}
      {children}
    </div>
  )
}

export function Pill({ tone, children }: { tone: Tone; children: ReactNode }) {
  return (
    <span
      data-tone={tone}
      className="rounded-md px-2 py-0.5 text-xs font-medium capitalize"
      style={{ color: toneVar[tone], background: 'color-mix(in srgb, ' + toneVar[tone] + ' 15%, transparent)' }}
    >
      {children}
    </span>
  )
}

export function ScoreBar({ score }: { score: number }) {
  const pct = ((Math.max(-1, Math.min(1, score)) + 1) / 2) * 100
  const tone: Tone = score > 0.05 ? 'bull' : score < -0.05 ? 'bear' : 'neutral'
  return (
    <div className="relative h-1.5 w-full rounded-full" style={{ background: 'var(--border-soft)' }}>
      <div className="absolute top-0 h-full w-px" style={{ left: '50%', background: 'var(--text-mut)' }} />
      <div
        data-testid="score-marker"
        className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ left: `${pct}%`, background: toneVar[tone] }}
      />
    </div>
  )
}

export function Meter({ value }: { value: number }) {
  const pct = Math.max(0, Math.min(1, value)) * 100
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full" style={{ background: 'var(--border-soft)' }}>
      <div data-testid="meter-fill" className="h-full rounded-full" style={{ width: `${pct}%`, background: 'var(--accent)' }} />
    </div>
  )
}

export function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-md border px-2 py-0.5 text-xs tnum"
      style={{ borderColor: 'var(--border-soft)', color: 'var(--text-dim)' }}>
      {children}
    </span>
  )
}

export function StatTile({ label, value, tone }: { label: string; value: ReactNode; tone?: Tone }) {
  return (
    <div className="rounded-lg border p-3" style={{ background: 'var(--surface-2)', borderColor: 'var(--border-soft)' }}>
      <div className="text-xs uppercase tracking-wide" style={{ color: 'var(--text-mut)' }}>{label}</div>
      <div className="mt-1 text-lg font-semibold tnum" style={{ color: tone ? toneVar[tone] : 'var(--text)' }}>{value}</div>
    </div>
  )
}
