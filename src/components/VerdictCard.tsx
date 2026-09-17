import type { Verdict } from '../api/types'
import { verdictTone, toneVar } from '../ui/tokens'
import { Meter } from '../ui/primitives'
import { AgentCard } from './AgentCard'

export function VerdictCard({ verdict }: { verdict: Verdict }) {
  if (verdict.status === 'unknown_ticker' || verdict.status === 'insufficient_data') {
    const heading = verdict.status === 'unknown_ticker' ? 'Unknown ticker' : 'Insufficient data'
    return (
      <div className="space-y-3 animate-fade-in">
        <div className="rounded-xl border p-5" style={{ background: 'var(--surface)', borderColor: 'var(--neutral)' }}>
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold" style={{ color: 'var(--text)' }}>{verdict.ticker}</h2>
            <span className="rounded-lg px-3 py-1 text-sm font-bold uppercase"
              style={{ color: 'var(--neutral)', background: 'color-mix(in srgb, var(--neutral) 18%, transparent)' }}>
              {heading}
            </span>
          </div>
          <p className="mt-3 text-sm" style={{ color: 'var(--text-dim)' }}>{verdict.narrative}</p>
          {verdict.skipped_agents.length > 0 && (
            <div className="mt-3 text-xs" style={{ color: 'var(--text-mut)' }}>
              {verdict.skipped_agents.map((a) => `${a}${verdict.skip_reasons[a] ? ` (${verdict.skip_reasons[a]})` : ''}`).join(', ')}
            </div>
          )}
        </div>
        {verdict.opinions.map((o) => <AgentCard key={o.agent} event={{ agent: o.agent, opinion: o }} />)}
      </div>
    )
  }
  const tone = verdictTone[verdict.verdict] ?? 'neutral'
  return (
    <div className="space-y-4 animate-fade-in">
      <div className="rounded-xl border p-5" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="text-2xl font-bold" style={{ color: 'var(--text)' }}>{verdict.ticker}</h2>
          <span className="rounded-lg px-3 py-1 text-sm font-bold uppercase"
            style={{ color: toneVar[tone], background: `color-mix(in srgb, ${toneVar[tone]} 18%, transparent)` }}>
            {verdict.verdict}
          </span>
          <span className="tnum text-sm" style={{ color: 'var(--text-dim)' }}>
            score {verdict.score >= 0 ? '+' : ''}{verdict.score.toFixed(2)}
          </span>
        </div>
        <div className="mt-3 flex items-center gap-3 text-xs" style={{ color: 'var(--text-mut)' }}>
          <span>confidence</span>
          <div className="w-40"><Meter value={verdict.confidence} /></div>
          <span className="tnum" style={{ color: 'var(--text)' }}>{Math.round(verdict.confidence * 100)}%</span>
        </div>
        {verdict.calibration_note && (
          <div className="mt-2 text-xs" style={{ color: 'var(--text-mut)' }}>⚖ {verdict.calibration_note}</div>
        )}
        <p className="mt-4 border-l-2 pl-3 text-sm leading-relaxed"
          style={{ borderColor: 'var(--accent)', color: 'var(--text-dim)' }}>{verdict.narrative}</p>
        {verdict.caution && (
          <div className="mt-3 rounded-lg border p-2 text-sm"
            style={{ borderColor: 'var(--neutral)', color: 'var(--neutral)', background: 'color-mix(in srgb, var(--neutral) 10%, transparent)' }}>
            ⚠ {verdict.caution}
          </div>
        )}
      </div>
      <div className="space-y-3">
        {verdict.opinions.map((o) => <AgentCard key={o.agent} event={{ agent: o.agent, opinion: o }} />)}
      </div>
      {verdict.skipped_agents.length > 0 && (
        <div className="text-xs" style={{ color: 'var(--text-mut)' }}>
          Skipped: {verdict.skipped_agents.map((a) => `${a}${verdict.skip_reasons[a] ? ` (${verdict.skip_reasons[a]})` : ''}`).join(', ')}
        </div>
      )}
      <div className="border-t pt-2 text-xs" style={{ borderColor: 'var(--border-soft)', color: 'var(--text-mut)' }}>{verdict.disclaimer}</div>
    </div>
  )
}
