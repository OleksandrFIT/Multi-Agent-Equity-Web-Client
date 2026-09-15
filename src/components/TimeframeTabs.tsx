import type { Period } from '../api/types'

const PERIODS: Period[] = ['1M', '3M', '6M', '1Y']

export function TimeframeTabs({ value, onChange }: { value: Period; onChange: (p: Period) => void }) {
  return (
    <div className="flex gap-1">
      {PERIODS.map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className="rounded-md px-2.5 py-1 text-xs font-medium"
          style={{
            background: p === value ? 'color-mix(in srgb, var(--accent) 20%, transparent)' : 'transparent',
            color: p === value ? 'var(--accent)' : 'var(--text-dim)',
          }}
        >
          {p}
        </button>
      ))}
    </div>
  )
}
