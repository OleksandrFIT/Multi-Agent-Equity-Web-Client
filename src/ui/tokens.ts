export type Tone = 'bull' | 'neutral' | 'bear' | 'accent'

export const stanceTone: Record<string, Tone> = {
  bullish: 'bull', neutral: 'neutral', bearish: 'bear',
}
export const verdictTone: Record<string, Tone> = {
  buy: 'bull', hold: 'neutral', sell: 'bear',
}
export const toneVar: Record<Tone, string> = {
  bull: 'var(--bull)', neutral: 'var(--neutral)', bear: 'var(--bear)', accent: 'var(--accent)',
}
