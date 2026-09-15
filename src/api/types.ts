export type Stance = 'bullish' | 'neutral' | 'bearish'

export interface AgentOpinion {
  agent: string
  stance: Stance
  score: number
  confidence: number
  rationale: string
  key_facts: string[]
  dropped_facts: string[]
  metrics?: Record<string, number>
}

export interface Verdict {
  ticker: string
  as_of: string
  verdict: 'buy' | 'hold' | 'sell'
  score: number
  confidence: number
  narrative: string
  opinions: AgentOpinion[]
  disclaimer: string
  caution: string | null
  skipped_agents: string[]
  skip_reasons: Record<string, string>
}

export type AgentEvent =
  | { agent: string; opinion: AgentOpinion }
  | { agent: string; skipped: true; reason: string }

export interface HorizonMetrics {
  n: number
  hit_rate: Record<string, number>
  mean_return: Record<string, number>
  ic: number | null
  long_short_curve: number[]
}
export interface BacktestReport {
  n_records: number
  horizons: Record<string, HorizonMetrics>
  disclaimer: string
}
export interface BacktestConfig { universe: string[]; dates: string[]; horizons: number[] }
export interface Health { ok: boolean; model: string; ollama_reachable: boolean }

export interface PricePoint { time: string; value: number }
export interface Prices {
  ticker: string
  period: string
  candles: PricePoint[]
  sma50: PricePoint[]
  sma200: PricePoint[]
  rsi: PricePoint[]
}
export type Period = '1M' | '3M' | '6M' | '1Y'
