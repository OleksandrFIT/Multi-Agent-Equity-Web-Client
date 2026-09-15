import { useEffect, useRef } from 'react'
import { ColorType, createChart, type IChartApi } from 'lightweight-charts'
import type { PricePoint } from '../api/types'

export function RsiChart({ rsi }: { rsi: PricePoint[] }) {
  const ref = useRef<HTMLDivElement>(null)
  const chartRef = useRef<IChartApi | null>(null)

  useEffect(() => {
    if (!ref.current || rsi.length === 0) return
    const chart = createChart(ref.current, {
      width: ref.current.clientWidth, height: 110,
      layout: { background: { type: ColorType.Solid, color: 'transparent' }, textColor: '#94a3b8' },
      grid: { vertLines: { color: '#1e293b' }, horzLines: { color: '#1e293b' } },
      rightPriceScale: { borderColor: '#263352' },
      timeScale: { borderColor: '#263352' },
    })
    chartRef.current = chart
    const line = chart.addLineSeries({ color: '#38bdf8', lineWidth: 1 })
    line.setData(rsi)
    line.createPriceLine({ price: 70, color: '#fb7185', lineWidth: 1, lineStyle: 2 })
    line.createPriceLine({ price: 30, color: '#34d399', lineWidth: 1, lineStyle: 2 })
    chart.timeScale().fitContent()
    const ro = new ResizeObserver(() => ref.current && chart.applyOptions({ width: ref.current.clientWidth }))
    ro.observe(ref.current)
    return () => { ro.disconnect(); chart.remove(); chartRef.current = null }
  }, [rsi])

  if (rsi.length === 0) return <div className="text-xs" style={{ color: 'var(--text-mut)' }}>no data</div>
  return <div ref={ref} className="w-full" />
}
