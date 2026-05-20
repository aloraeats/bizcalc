import { useNavigate, useLocation } from 'react-router-dom'
import useStore from '@/store/useStore'
import { Button } from '@/components/ui'

export default function Navbar() {
  const navigate    = useNavigate()
  const location    = useLocation()
  const goHome      = useStore(s => s.goHome)
  const template    = useStore(s => s.currentTemplate)
  const isHome      = location.pathname === '/'

  function handleBack() {
    goHome()
    navigate('/')
  }

  return (
    <nav className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">

        {/* Logo */}
        <div
          className="text-xl font-black tracking-tight cursor-pointer select-none"
          onClick={() => { if (!isHome) handleBack() }}
        >
          <span style={{ color: template?.accent || '#00b894' }}>Biz</span>
          <span className="text-gray-800">Calc</span>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {!isHome && (
            <>
              {/* Current template badge */}
              {template && (
                <span className="hidden sm:inline-flex text-xs font-semibold px-2.5 py-1 rounded-full"
                  style={{ backgroundColor: template.accent + '20', color: template.accent }}>
                  {template.icon} {template.name}
                </span>
              )}

              <Button
                variant="outline"
                size="sm"
                onClick={handleBack}
                className="no-print"
              >
                ← Templates
              </Button>
            </>
          )}
        </div>

      </div>
    </nav>
  )
}