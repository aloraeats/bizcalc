import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { initDB } from '@/db/db'
import Navbar from '@/components/Navbar'
import Home from '@/pages/Home'
import Calculator from '@/pages/Calculator'

// ─────────────────────────────────────────
//  Detect base path at runtime
//  GitHub Pages  → /bizcalc
//  Custom domain → /
//  Local dev     → /
// ─────────────────────────────────────────
const basename = window.location.pathname.startsWith('/bizcalc')
  ? '/bizcalc'
  : '/'

export default function App() {
  useEffect(() => {
    initDB().catch(console.error)
  }, [])

  return (
    <BrowserRouter basename={basename}>
      <Navbar />
      <Routes>
        <Route path="/"                        element={<Home />} />
        <Route path="/calculator/:templateKey" element={<Calculator />} />
        <Route path="*"                        element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}