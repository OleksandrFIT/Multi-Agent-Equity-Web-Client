export function LongShortCurve({ curve }: { curve: number[] }) {
  if (curve.length === 0) return <div className="text-sm text-gray-400">no data</div>
  const w = 320, h = 80, pad = 4
  const min = Math.min(0, ...curve), max = Math.max(0, ...curve)
  const range = max - min || 1
  const x = (i: number) => pad + (i * (w - 2 * pad)) / Math.max(1, curve.length - 1)
  const y = (v: number) => h - pad - ((v - min) / range) * (h - 2 * pad)
  const points = curve.map((v, i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ')
  const zeroY = y(0)
  return (
    <svg width={w} height={h} className="rounded border border-gray-200">
      <line x1={pad} y1={zeroY} x2={w - pad} y2={zeroY} stroke="#e5e7eb" />
      <polyline points={points} fill="none" stroke="#2563eb" strokeWidth={1.5} />
    </svg>
  )
}
