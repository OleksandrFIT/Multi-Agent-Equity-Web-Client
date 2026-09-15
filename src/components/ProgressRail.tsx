const AGENTS = ['fundamentals', 'technical', 'sentiment', 'risk']

export function ProgressRail({ done, running }: { done: Set<string>; running: boolean }) {
  return (
    <div className="flex flex-wrap gap-2">
      {AGENTS.map((a) => {
        const isDone = done.has(a)
        const isRunning = running && !isDone
        return (
          <span key={a}
            className={`rounded-md border px-2.5 py-1 text-xs capitalize ${isRunning ? 'animate-pulse-soft' : ''}`}
            style={{
              borderColor: isDone ? 'var(--bull)' : 'var(--border-soft)',
              color: isDone ? 'var(--bull)' : 'var(--text-mut)',
              background: isDone ? 'color-mix(in srgb, var(--bull) 12%, transparent)' : 'transparent',
            }}>
            {isDone ? '✓ ' : ''}{a}
          </span>
        )
      })}
    </div>
  )
}
