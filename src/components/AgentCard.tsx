import type { AgentEvent } from '../api/types'
import { stanceTone } from '../ui/tokens'
import { Card, Pill, ScoreBar, Meter, Chip } from '../ui/primitives'
import { MetricGauges } from './MetricGauges'

export function AgentCard({ event }: { event: AgentEvent }) {
  if ('skipped' in event) {
    return (
      <div className="rounded-xl border p-3 opacity-60"
        style={{ background: 'var(--surface-2)', borderColor: 'var(--border-soft)' }}>
        <div className="font-medium capitalize" style={{ color: 'var(--text-dim)' }}>{event.agent}</div>
        <div className="text-sm" style={{ color: 'var(--text-mut)' }}>skipped — {event.reason}</div>
      </div>
    )
  }
  const o = event.opinion
  const tone = stanceTone[o.stance] ?? 'neutral'
  return (
    <div className="animate-fade-in">
      <Card accent={tone} title={
        <div className="flex items-center justify-between">
          <span className="capitalize">{o.agent}</span>
          <Pill tone={tone}>{o.stance}</Pill>
        </div>
      }>
        <p className="text-sm" style={{ color: 'var(--text-dim)' }}>{o.rationale}</p>
        <div className="mt-3 grid grid-cols-[auto_1fr] items-center gap-x-3 gap-y-2 text-xs" style={{ color: 'var(--text-mut)' }}>
          <span>score</span><div className="flex items-center gap-2"><ScoreBar score={o.score} /><span className="tnum" style={{ color: 'var(--text)' }}>{o.score >= 0 ? '+' : ''}{o.score.toFixed(2)}</span></div>
          <span>confidence</span><div className="flex items-center gap-2"><Meter value={o.confidence} /><span className="tnum" style={{ color: 'var(--text)' }}>{Math.round(o.confidence * 100)}%</span></div>
        </div>
        {o.metrics && Object.keys(o.metrics).length > 0 && <div className="mt-3"><MetricGauges metrics={o.metrics} /></div>}
        {o.key_facts.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">{o.key_facts.map((f) => <Chip key={f}>{f}</Chip>)}</div>
        )}
      </Card>
    </div>
  )
}
