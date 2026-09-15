import { useEffect, useState } from 'react'
import { getJSON } from '../api/client'
import type { Health } from '../api/types'

export function HealthBanner() {
  const [h, setH] = useState<Health | null>(null)
  useEffect(() => {
    getJSON<Health>('/api/health').then(setH).catch(() => setH({ ok: false, model: '', ollama_reachable: false }))
  }, [])
  const ok = h?.ollama_reachable ?? false
  const tone = ok ? 'var(--bull)' : 'var(--bear)'
  return (
    <span className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--text-dim)' }} title={h?.model || ''}>
      <span className="h-2 w-2 rounded-full" style={{ background: tone }} />
      {ok ? h?.model || 'online' : 'ollama offline'}
    </span>
  )
}
