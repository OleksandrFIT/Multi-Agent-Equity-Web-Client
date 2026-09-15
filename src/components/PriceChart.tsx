import { useEffect, useRef } from 'react'
import { ColorType, createChart, type IChartApi } from 'lightweight-charts'
import type { Prices } from '../api/types'

const CHART_OPTS = {
  height: 260,
  layout: { background: { type: ColorType.Solid, color: 'transparent' }, textColor: '#94a3b8' },
  grid: { vertLines: { color: '#1e293b' }, horzLines: { color: '#1e293b' } },
  rightPriceScale: { borderColor: '#263352' },
  timeScale: { borderColor: '#263352' },
}

export function PriceChart({ prices }: { prices: Prices }) {
  const ref = useRef<HTMLDivElement>(null)
  const chartRef = useRef<IChartApi | null>(null)

  useEffect(() => {
    if (!ref.current) return
    const chart = createChart(ref.current, { ...CHART_OPTS, width: ref.current.clientWidth })
    chartRef.current = chart
    const price = chart.addAreaSeries({ lineColor: '#38bdf8', topColor: 'rgba(56,189,248,0.25)', bottomColor: 'rgba(56,189,248,0)', lineWidth: 2 })
    price.setData(prices.candles)
    if (prices.sma50.length) chart.addLineSeries({ color: '#fbbf24', lineWidth: 1 }).setData(prices.sma50)
    if (prices.sma200.length) chart.addLineSeries({ color: '#fb7185', lineWidth: 1 }).setData(prices.sma200)
    chart.timeScale().fitContent()
    const ro = new ResizeObserver(() => ref.current && chart.applyOptions({ width: ref.current.clientWidth }))
    ro.observe(ref.current)
    return () => { ro.disconnect(); chart.remove(); chartRef.current = null }
  }, [prices])

  return <div ref={ref} className="w-full" />
}
