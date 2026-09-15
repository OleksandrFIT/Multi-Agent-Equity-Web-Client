export async function getJSON<T>(url: string): Promise<T> {
  const r = await fetch(url)
  if (!r.ok) throw new Error(`GET ${url} failed: ${r.status}`)
  return r.json()
}

export async function postJSON<T>(url: string, body: unknown): Promise<T> {
  const r = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!r.ok) throw new Error(`POST ${url} failed: ${r.status}`)
  return r.json()
}

export interface SSEHandlers {
  [event: string]: (data: any) => void
}

// Opens an SSE stream. `handlers` maps event names to callbacks; `onDone` runs
// when a terminal event ('verdict' | 'report' | 'error') arrives, and the stream
// is closed. Browsers fire a spurious 'error' on normal close — we only treat it
// as a failure while the connection is still open.
export function streamSSE(
  url: string,
  handlers: SSEHandlers,
  onDone?: () => void,
): EventSource {
  const es = new EventSource(url)
  const terminal = new Set(['verdict', 'report', 'error'])
  for (const [event, cb] of Object.entries(handlers)) {
    es.addEventListener(event, (e: MessageEvent) => {
      cb(JSON.parse(e.data))
      if (terminal.has(event)) {
        es.close()
        onDone?.()
      }
    })
  }
  es.onerror = () => {
    if (es.readyState === EventSource.CLOSED) return
    es.close()
    handlers['error']?.({ message: 'connection lost' })
    onDone?.()
  }
  return es
}
