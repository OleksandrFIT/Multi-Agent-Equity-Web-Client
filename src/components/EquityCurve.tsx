import { useEffect, useRef } from 'react'
import { ColorType, createChart, type IChartApi } from 'lightweight-charts'

export function EquityCurve({ curve }: { curve: number[] }) {
  const ref = useRef<HTMLDivElement>(null)
  const chartRef = useRef<IChartApi | null>(null)

  useEffect(() => {
    if (!ref.current || curve.length === 0) return
    const chart = createChart(ref.current, {
      width: ref.current.clientWidth, height: 140,
      layout: { background: { type: ColorType.Solid, color: 'transparent' }, textColor: '#94a3b8' },
      grid: { vertLines: { color: '#1e293b' }, horzLines: { color: '#1e293b' } },
      rightPriceScale: { borderColor: '#263352' },
      timeScale: { borderColor: '#263352' },
    })
    chartRef.current = chart
    const s = chart.addLineSeries({ color: '#38bdf8', lineWidth: 2 })
    s.setData(curve.map((v, i) => ({ time: (i + 1) as unknown as string, value: v })))
    chart.timeScale().fitContent()
    const ro = new ResizeObserver(() => ref.current && chart.applyOptions({ width: ref.current.clientWidth }))
    ro.observe(ref.current)
    return () => { ro.disconnect(); chart.remove(); chartRef.current = null }
  }, [curve])

  if (curve.length === 0) return <div className="text-xs" style={{ color: 'var(--text-mut)' }}>no data</div>
  return <div ref={ref} className="w-full" />
}
