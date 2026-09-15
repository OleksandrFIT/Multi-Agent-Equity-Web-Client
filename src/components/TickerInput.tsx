import { useState } from 'react'

export function TickerInput({ onSubmit, disabled }: { onSubmit: (t: string) => void; disabled?: boolean }) {
  const [t, setT] = useState('')
  return (
    <form onSubmit={(e) => { e.preventDefault(); if (t.trim()) onSubmit(t.trim().toUpperCase()) }} className="flex gap-2">
      <input value={t} onChange={(e) => setT(e.target.value)} placeholder="Ticker (e.g. AAPL)"
        className="rounded-lg border border-gray-300 px-3 py-2" />
      <button disabled={disabled} className="rounded-lg bg-blue-600 px-4 py-2 text-white disabled:opacity-50">Go</button>
    </form>
  )
}
