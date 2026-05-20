import { useNavigate } from 'react-router-dom'
import { templates } from '@/data/templates'
import useStore from '@/store/useStore'
import type { Template } from '@/types'

export default function Home() {
  const navigate    = useNavigate()
  const setTemplate = useStore(s => s.setTemplate)

  function handleSelect(template: Template) {
    setTemplate(template)
    navigate(`/calculator/${template.key}`)
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">

      {/* Hero */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-black text-gray-800 mb-3">
          What do you want to calculate?
        </h1>
        <p className="text-gray-500 text-base max-w-lg mx-auto leading-relaxed">
          Choose a template that matches your business.
          All templates use the same simple and powerful calculation logic.
        </p>
      </div>

      {/* Template Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {templates.map(template => (
          <TemplateCard
            key={template.key}
            template={template}
            onSelect={handleSelect}
          />
        ))}
      </div>

      {/* Footer note */}
      <p className="text-center text-xs text-gray-400 mt-10">
        BizCalc works offline. Your data stays on your device.
      </p>

    </div>
  )
}

// ─────────────────────────────────────────
//  TEMPLATE CARD (internal component)
// ─────────────────────────────────────────
interface TemplateCardProps {
  template: Template
  onSelect: (template: Template) => void
}

function TemplateCard({ template, onSelect }: TemplateCardProps) {
  return (
    <button
      onClick={() => onSelect(template)}
      className="text-left bg-white rounded-2xl border-2 border-transparent
                 shadow-sm hover:shadow-md transition-all duration-200
                 hover:-translate-y-1 p-6 group focus:outline-none"
      style={{ '--accent': template.accent } as React.CSSProperties}
      onMouseEnter={e => (e.currentTarget.style.borderColor = template.accent)}
      onMouseLeave={e => (e.currentTarget.style.borderColor = 'transparent')}
    >
      {/* Top bar */}
      <div
        className="h-1 rounded-full mb-5 -mx-6 -mt-6 opacity-80"
        style={{ backgroundColor: template.accent }}
      />

      {/* Icon + Badge */}
      <div className="flex items-start justify-between mb-3">
        <span className="text-3xl">{template.icon}</span>
        <span
          className="text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wide"
          style={{
            backgroundColor: template.accent + '18',
            color:           template.accent,
          }}
        >
          {template.badge}
        </span>
      </div>

      {/* Name */}
      <h2 className="text-base font-bold text-gray-800 mb-2 group-hover:text-gray-900">
        {template.name}
      </h2>

      {/* Description */}
      <p className="text-sm text-gray-500 leading-relaxed">
        {template.cardDescription}
      </p>

      {/* Arrow */}
      <div
        className="mt-4 text-sm font-semibold flex items-center gap-1 transition-all"
        style={{ color: template.accent }}
      >
        Get started →
      </div>

    </button>
  )
}