import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom'
import { HealthBanner } from './components/HealthBanner'
import { Analyze } from './pages/Analyze'
import { Backtest } from './pages/Backtest'
import { Ingest } from './pages/Ingest'

const tabs = [{ to: '/', label: 'Analyze' }, { to: '/backtest', label: 'Backtest' }, { to: '/ingest', label: 'Ingest' }]

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <header className="sticky top-0 z-10 border-b" style={{ background: 'var(--surface-2)', borderColor: 'var(--border)' }}>
          <div className="mx-auto flex max-w-4xl flex-wrap items-center gap-4 px-4 py-3">
            <span className="text-sm font-bold tracking-wide" style={{ color: 'var(--accent)' }}>◆ Equity Terminal</span>
            <nav className="flex gap-1 text-sm">
              {tabs.map((t) => (
                <NavLink key={t.to} to={t.to} end={t.to === '/'}
                  className="rounded-md px-3 py-1"
                  style={({ isActive }) => ({
                    color: isActive ? 'var(--accent)' : 'var(--text-dim)',
                    borderBottom: isActive ? '2px solid var(--accent)' : '2px solid transparent',
                  })}>
                  {t.label}
                </NavLink>
              ))}
            </nav>
            <div className="ml-auto"><HealthBanner /></div>
          </div>
        </header>
        <main className="mx-auto max-w-4xl px-4 py-6">
          <Routes>
            <Route path="/" element={<Analyze />} />
            <Route path="/backtest" element={<Backtest />} />
            <Route path="/ingest" element={<Ingest />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}
