import React from 'react'

// ─────────────────────────────────────────
//  BUTTON
// ─────────────────────────────────────────
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'outline'
  accent?:  string
  size?:    'sm' | 'md'
}

export function Button({
  variant = 'primary',
  accent,
  size = 'md',
  children,
  style,
  ...props
}: ButtonProps) {
  const base = `
    inline-flex items-center justify-center gap-2
    font-semibold rounded-lg transition-all duration-200
    disabled:opacity-50 disabled:cursor-not-allowed
    ${size === 'sm' ? 'px-3 py-1.5 text-xs' : 'px-4 py-2.5 text-sm'}
  `

  const variants: Record<string, string> = {
    primary:   'text-white shadow-sm hover:opacity-90 active:scale-95',
    secondary: 'bg-gray-100 text-gray-700 hover:bg-gray-200 active:scale-95',
    danger:    'bg-red-50 text-red-600 border border-red-200 hover:bg-red-100',
    outline:   'bg-white border text-gray-600 hover:bg-gray-50',
  }

  const inlineStyle =
    variant === 'primary' && accent
      ? { backgroundColor: accent, ...style }
      : variant === 'outline' && accent
      ? { borderColor: accent, color: accent, ...style }
      : style

  return (
    <button
      className={`${base} ${variants[variant]}`}
      style={inlineStyle}
      {...props}
    >
      {children}
    </button>
  )
}

// ─────────────────────────────────────────
//  BADGE
// ─────────────────────────────────────────
interface BadgeProps {
  children: React.ReactNode
  accent?:  string
  light?:   boolean
}

export function Badge({ children, accent, light = false }: BadgeProps) {
  return (
    <span
      className="inline-flex items-center px-2.5 py-0.5 rounded-full
                 text-xs font-bold uppercase tracking-wide"
      style={
        light
          ? {
              backgroundColor: accent ? accent + '20' : '#f3f4f6',
              color:           accent || '#374151',
            }
          : {
              backgroundColor: accent || '#374151',
              color:           '#fff',
            }
      }
    >
      {children}
    </span>
  )
}

// ─────────────────────────────────────────
//  FIELD GROUP
// ─────────────────────────────────────────
interface FieldGroupProps {
  label:    string
  hint:     string
  accent?:  string
  children: React.ReactNode
}

export function FieldGroup({ label, hint, children }: FieldGroupProps) {
  return (
    <div className="flex flex-col gap-1 flex-1 min-w-[140px]">
      <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">
        {label}
      </label>
      {children}
      <span className="text-xs text-gray-400 leading-relaxed">{hint}</span>
    </div>
  )
}

// ─────────────────────────────────────────
//  INPUT — with forwardRef
// ─────────────────────────────────────────
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  accent?: string
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ accent, onFocus, onBlur, style, ...props }, ref) => {
    const [focused, setFocused] = React.useState(false)

    return (
      <input
        ref={ref}
        className="w-full px-3 py-2.5 rounded-lg border text-sm
                   bg-gray-50 text-gray-800 outline-none transition-all"
        style={{
          borderColor: focused && accent ? accent : '#e5e7eb',
          boxShadow:   focused && accent ? `0 0 0 2px ${accent}22` : 'none',
          ...style,
        }}
        onFocus={e => { setFocused(true); onFocus?.(e) }}
        onBlur={e  => { setFocused(false); onBlur?.(e) }}
        {...props}
      />
    )
  }
)
Input.displayName = 'Input'

// ─────────────────────────────────────────
//  SELECT — with forwardRef
// ─────────────────────────────────────────
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  accent?:  string
  options:  string[]
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ accent, options, onFocus, onBlur, style, ...props }, ref) => {
    const [focused, setFocused] = React.useState(false)

    return (
      <select
        ref={ref}
        className="w-full px-3 py-2.5 rounded-lg border text-sm
                   bg-gray-50 text-gray-800 outline-none transition-all"
        style={{
          borderColor: focused && accent ? accent : '#e5e7eb',
          boxShadow:   focused && accent ? `0 0 0 2px ${accent}22` : 'none',
          ...style,
        }}
        onFocus={e => { setFocused(true); onFocus?.(e) }}
        onBlur={e  => { setFocused(false); onBlur?.(e) }}
        {...props}
      >
        {options.map(opt => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    )
  }
)
Select.displayName = 'Select'

// ─────────────────────────────────────────
//  EMPTY STATE
// ─────────────────────────────────────────
interface EmptyStateProps {
  icon?:   string
  message: string
}

export function EmptyState({ icon = '📦', message }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-14 text-gray-400">
      <span className="text-4xl mb-3">{icon}</span>
      <p className="text-sm">{message}</p>
    </div>
  )
}

// ─────────────────────────────────────────
//  CARD
// ─────────────────────────────────────────
interface CardProps {
  children:   React.ReactNode
  className?: string
  accent?:    string
  topBorder?: boolean
}

export function Card({
  children,
  className = '',
  accent,
  topBorder = false,
}: CardProps) {
  return (
    <div
      className={`bg-white rounded-xl shadow-sm border
                  border-gray-100 overflow-hidden ${className}`}
      style={
        topBorder && accent
          ? { borderTop: `3px solid ${accent}` }
          : {}
      }
    >
      {children}
    </div>
  )
}