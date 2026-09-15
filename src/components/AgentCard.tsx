import type { AgentEvent } from '../api/types'

const stanceColor: Record<string, string> = {
  bullish: 'text-green-700', bearish: 'text-red-700', neutral: 'text-gray-600',
}

export function AgentCard({ event }: { event: AgentEvent }) {
  if ('skipped' in event) {
    return (
      <div className="rounded-xl border border-gray-200 p-3 opacity-70">
        <div className="font-medium capitalize">{event.agent}</div>
        <div className="text-sm text-gray-500">skipped — {event.reason}</div>
      </div>
    )
  }
  const o = event.opinion
  return (
    <div className="rounded-xl border border-gray-200 p-3">
      <div className="flex items-center justify-between">
        <span className="font-medium capitalize">{o.agent}</span>
        <span className={`text-sm ${stanceColor[o.stance] ?? ''}`}>
          {o.stance} ({o.score >= 0 ? '+' : ''}{o.score.toFixed(2)}, {Math.round(o.confidence * 100)}%)
        </span>
      </div>
      <p className="mt-1 text-sm text-gray-700">{o.rationale}</p>
      {o.key_facts.length > 0 && (
        <div className="mt-1 text-xs text-gray-500">{o.key_facts.join(' · ')}</div>
      )}
    </div>
  )
}
