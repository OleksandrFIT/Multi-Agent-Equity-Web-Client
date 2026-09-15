import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import { HealthBanner } from './components/HealthBanner'
import { Analyze } from './pages/Analyze'
import { Backtest } from './pages/Backtest'
import { Ingest } from './pages/Ingest'

export default function App() {
  return (
    <BrowserRouter>
      <div className="mx-auto max-w-3xl p-6">
        <header className="mb-4 flex items-center gap-4">
          <h1 className="text-xl font-semibold">Equity Research</h1>
          <nav className="flex gap-3 text-sm text-blue-600">
            <Link to="/">Analyze</Link>
            <Link to="/backtest">Backtest</Link>
            <Link to="/ingest">Ingest</Link>
          </nav>
        </header>
        <HealthBanner />
        <Routes>
          <Route path="/" element={<Analyze />} />
          <Route path="/backtest" element={<Backtest />} />
          <Route path="/ingest" element={<Ingest />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
