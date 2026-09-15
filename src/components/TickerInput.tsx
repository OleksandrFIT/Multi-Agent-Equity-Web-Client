import { useState } from 'react'

export function TickerInput({ onSubmit, disabled }: { onSubmit: (t: string) => void; disabled?: boolean }) {
  const [t, setT] = useState('')
  return (
    <form onSubmit={(e) => { e.preventDefault(); if (t.trim()) onSubmit(t.trim().toUpperCase()) }} className="flex gap-2">
      <input value={t} onChange={(e) => setT(e.target.value)} placeholder="Ticker (e.g. AAPL)"
        className="tnum rounded-lg border px-3 py-2 text-sm outline-none"
        style={{ background: 'var(--surface-2)', borderColor: 'var(--border)', color: 'var(--text)' }} />
      <button disabled={disabled}
        className="rounded-lg px-4 py-2 text-sm font-medium disabled:opacity-50"
        style={{ background: 'var(--accent)', color: '#04121f' }}>Go</button>
    </form>
  )
}
