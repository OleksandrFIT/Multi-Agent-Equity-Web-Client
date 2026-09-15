import type { Verdict } from '../api/types'
import { AgentCard } from './AgentCard'

const verdictColor: Record<string, string> = {
  buy: 'bg-green-100 text-green-800', hold: 'bg-gray-100 text-gray-800', sell: 'bg-red-100 text-red-800',
}

export function VerdictCard({ verdict }: { verdict: Verdict }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <h2 className="text-2xl font-semibold">{verdict.ticker}</h2>
        <span className={`rounded-lg px-3 py-1 text-sm font-medium uppercase ${verdictColor[verdict.verdict]}`}>
          {verdict.verdict}
        </span>
        <span className="text-sm text-gray-500">
          score {verdict.score >= 0 ? '+' : ''}{verdict.score.toFixed(2)} · confidence {Math.round(verdict.confidence * 100)}%
        </span>
      </div>
      <p className="text-gray-800">{verdict.narrative}</p>
      <div className="space-y-2">
        {verdict.opinions.map((o) => (
          <AgentCard key={o.agent} event={{ agent: o.agent, opinion: o }} />
        ))}
      </div>
      {verdict.caution && (
        <div className="rounded-lg bg-amber-50 p-2 text-sm text-amber-800">⚠ {verdict.caution}</div>
      )}
      {verdict.skipped_agents.length > 0 && (
        <div className="text-xs text-gray-500">
          Skipped: {verdict.skipped_agents.map((a) => `${a}${verdict.skip_reasons[a] ? ` (${verdict.skip_reasons[a]})` : ''}`).join(', ')}
        </div>
      )}
      <div className="border-t pt-2 text-xs text-gray-400">{verdict.disclaimer}</div>
    </div>
  )
}
