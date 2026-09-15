export function Gauge({
  label, value, min, max, format, tone = 'var(--accent)',
}: {
  label: string
  value: number
  min: number
  max: number
  format: (v: number) => string
  tone?: string
}) {
  const frac = Math.max(0, Math.min(1, (value - min) / (max - min || 1)))
  const r = 34
  const circ = Math.PI * r // half circle
  const dash = frac * circ
  return (
    <div className="flex flex-col items-center rounded-lg border p-3"
      style={{ background: 'var(--surface-2)', borderColor: 'var(--border-soft)' }}>
      <svg width="86" height="52" viewBox="0 0 86 52">
        <path d="M9 46 A34 34 0 0 1 77 46" fill="none" stroke="var(--border)" strokeWidth="7" strokeLinecap="round" />
        <path d="M9 46 A34 34 0 0 1 77 46" fill="none" stroke={tone} strokeWidth="7" strokeLinecap="round"
          strokeDasharray={`${dash} ${circ}`} />
      </svg>
      <div className="-mt-3 text-base font-semibold tnum" style={{ color: 'var(--text)' }}>{format(value)}</div>
      <div className="mt-0.5 text-xs uppercase tracking-wide" style={{ color: 'var(--text-mut)' }}>{label}</div>
    </div>
  )
}
