import { useEffect, useState } from 'react'
import { getJSON } from '../api/client'
import type { Health } from '../api/types'

export function HealthBanner() {
  const [h, setH] = useState<Health | null>(null)
  useEffect(() => {
    getJSON<Health>('/api/health').then(setH).catch(() => setH({ ok: false, model: '', ollama_reachable: false }))
  }, [])
  if (h && !h.ollama_reachable) {
    return <div className="bg-red-100 p-2 text-sm text-red-800">Ollama is not reachable — start it and reload.</div>
  }
  return null
}
