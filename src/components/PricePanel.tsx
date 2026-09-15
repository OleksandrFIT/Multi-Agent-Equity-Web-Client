import { useEffect, useState } from 'react'
import { getPrices } from '../api/client'
import type { Period, Prices } from '../api/types'
import { Card } from '../ui/primitives'
import { PriceChart } from './PriceChart'
import { RsiChart } from './RsiChart'
import { TimeframeTabs } from './TimeframeTabs'

export function PricePanel({ ticker }: { ticker: string }) {
  const [period, setPeriod] = useState<Period>('6M')
  const [prices, setPrices] = useState<Prices | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let alive = true
    setError(null)
    getPrices(ticker, period)
      .then((p) => { if (alive) setPrices(p) })
      .catch((e) => { if (alive) setError((e as Error).message) })
    return () => { alive = false }
  }, [ticker, period])

  return (
    <Card title={
      <div className="flex items-center justify-between">
        <span>{ticker} price</span>
        <TimeframeTabs value={period} onChange={setPeriod} />
      </div>
    }>
      {error && <div className="text-xs" style={{ color: 'var(--bear)' }}>chart unavailable — {error}</div>}
      {!error && !prices && <div className="h-[260px] animate-pulse-soft rounded-lg" style={{ background: 'var(--surface-2)' }} />}
      {!error && prices && prices.candles.length === 0 && <div className="text-xs" style={{ color: 'var(--text-mut)' }}>no data</div>}
      {!error && prices && prices.candles.length > 0 && (
        <div className="space-y-2">
          <PriceChart prices={prices} />
          <div className="text-xs uppercase tracking-wide" style={{ color: 'var(--text-mut)' }}>RSI (14)</div>
          <RsiChart rsi={prices.rsi} />
        </div>
      )}
    </Card>
  )
}
