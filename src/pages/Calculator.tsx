import React, { useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getTemplateByKey } from '@/data/templates'
import useStore from '@/store/useStore'
import { exportPDF, exportCSV } from '@/utils/exports'
import { saveEntry } from '@/db/db'
import {
  Button, Badge, FieldGroup,
  Input, Select, EmptyState, Card,
} from '@/components/ui'
import type { HistoryEntry, TableRow } from '@/types'

export default function Calculator() {
  const { templateKey }  = useParams<{ templateKey: string }>()
  const navigate         = useNavigate()
  const template         = getTemplateByKey(templateKey || '')

  const { rows, history, addRow, deleteRow, clearRows, addHistory, clearHistory } = useStore()

  // Form refs — one per field
  const fieldRefs = useRef<Record<string, HTMLInputElement | HTMLSelectElement | null>>({})

  // Redirect home if template not found
  React.useEffect(() => {
    if (!template) navigate('/')
  }, [template, navigate])

  if (!template) return null

  // ── Grand Total ──
  const grandTotal = React.useMemo(() => {
    const isSales = template.key === 'sales'
    const total   = rows.reduce((sum, r) => {
      const last  = r.cols[r.cols.length - 1]
      const match = last.replace(/,/g, '').match(/[\d.]+/)
      return sum + (match ? parseFloat(match[0]) : 0)
    }, 0)
    return isSales ? `GHS ${total.toLocaleString()}` : `${total.toLocaleString()} Units`
  }, [rows, template.key])

  // ── Add Row ──
  function handleAdd() {
    const fieldValues: Record<string, string | number> = {}
    let valid = true

    for (const field of template!.fields) {
      const el  = fieldRefs.current[field.id]
      const val = el?.value.trim() || ''

      if (!val) {
        alert(`⚠️ Please fill in: ${field.label}`)
        el?.focus()
        valid = false
        break
      }

      if (field.type === 'number') {
        const num = parseFloat(val)
        if (isNaN(num) || num <= 0) {
          alert(`⚠️ "${field.label}" must be a number greater than 0`)
          el?.focus()
          valid = false
          break
        }
        fieldValues[field.id] = num
      } else {
        fieldValues[field.id] = val
      }
    }

    if (!valid) return

    const result = template!.calculate(fieldValues)

    const newRow: Omit<TableRow, 'id'> = { cols: result.cols }
    addRow(newRow)

    // Save to history
    const now  = new Date()
    const entry: Omit<HistoryEntry, 'id'> = {
      text:         result.historyText,
      time:         now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      date:         now.toLocaleDateString(),
      templateKey:  template!.key,
      templateName: template!.name,
    }
    addHistory(entry)

    // Save to SQLite
    saveEntry({
      template_key:  template!.key,
      template_name: template!.name,
      entry_text:    result.historyText,
      numeric_total: result.numericTotal,
      created_at:    now.toISOString(),
    })

    // Clear text/number fields only
    template!.fields.forEach(f => {
      if (f.type !== 'select') {
        const el = fieldRefs.current[f.id]
        if (el) el.value = ''
      }
    })

    // Focus first field
    fieldRefs.current[template!.fields[0].id]?.focus()
  }

  // ── Key handler ──
  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') handleAdd()
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 pb-16 space-y-5">

      {/* ── Header ── */}
      <CalcHeader template={template} />

      {/* ── Entry Form ── */}
      <Card>
        <div className="p-5">
          <h3 className="section-title mb-4">Add Entry</h3>
          <div className="flex flex-wrap gap-3">
            {template.fields.map(field => (
              <FieldGroup
                key={field.id}
                label={field.label}
                hint={field.hint}
                accent={template.accent}
              >
                {field.type === 'select' ? (
                  <Select
                    accent={template.accent}
                    options={field.options || []}
                    ref={el => { fieldRefs.current[field.id] = el }}
                    onKeyDown={handleKeyDown}
                  />
                ) : (
                  <Input
                    type={field.type}
                    placeholder={field.placeholder}
                    accent={template.accent}
                    ref={el => { fieldRefs.current[field.id] = el }}
                    onKeyDown={handleKeyDown}
                    min={field.type === 'number' ? '0' : undefined}
                    step={field.type === 'number' ? 'any' : undefined}
                  />
                )}
              </FieldGroup>
            ))}
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-2 mt-5 no-print">
            <Button accent={template.accent} onClick={handleAdd}>
              + Add Row
            </Button>
            <Button variant="secondary" onClick={clearRows}>
              Clear Rows
            </Button>
            <div className="ml-auto flex gap-2">
              <Button
                variant="outline"
                accent={template.accent}
                onClick={() => exportPDF(template, rows, grandTotal)}
              >
                ⬇ PDF
              </Button>
              <Button
                variant="outline"
                accent={template.accent}
                onClick={() => exportCSV(template, rows)}
              >
                ⬇ Excel
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* ── Results Table ── */}
      <Card>
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h3 className="section-title">{template.tableTitle}</h3>
          <Badge accent={template.accent}>
            {rows.length} {rows.length === 1 ? 'item' : 'items'}
          </Badge>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b-2 border-gray-100">
              <tr>
                {template.columns.map((col, i) => (
                  <th
                    key={col}
                    className="px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wide"
                    style={{ textAlign: i === 0 ? 'left' : 'center' }}
                  >
                    {col}
                  </th>
                ))}
                <th className="w-10 no-print" />
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={template.columns.length + 1}>
                    <EmptyState message="No entries yet. Fill in the form above and click Add Row." />
                  </td>
                </tr>
              ) : (
                rows.map(row => (
                  <tr key={row.id} className="table-row">
                    {row.cols.map((col, i) => (
                      <td
                        key={i}
                        className="px-4 py-3 text-gray-700"
                        style={{
                          textAlign:  i === 0 ? 'left' : 'center',
                          fontWeight: i === row.cols.length - 1 ? 700 : 400,
                          color:      i === row.cols.length - 1 ? template.accent : undefined,
                        }}
                      >
                        {col}
                      </td>
                    ))}
                    <td className="px-2 no-print">
                      <button
                        onClick={() => deleteRow(row.id)}
                        className="text-gray-300 hover:text-red-500 hover:bg-red-50
                                   rounded px-1.5 py-0.5 transition-colors text-base"
                        title="Remove row"
                      >
                        ✕
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* ── Summary ── */}
      {rows.length > 0 && (
        <Card>
          <div className="px-5 py-4 border-b border-gray-100">
            <h3 className="section-title">Summary</h3>
          </div>
          <table className="w-full text-sm">
            <tbody>
              {rows.map(row => (
                <tr key={row.id} className="border-b border-gray-50">
                  <td className="px-5 py-3 text-gray-600">{row.cols[0]}</td>
                  <td
                    className="px-5 py-3 text-right font-bold"
                    style={{ color: template.accent }}
                  >
                    {row.cols[row.cols.length - 1]}
                  </td>
                </tr>
              ))}
              {/* Grand Total */}
              <tr className="bg-gray-50">
                <td className="px-5 py-4 font-black text-gray-800 text-base">
                  Grand Total
                </td>
                <td
                  className="px-5 py-4 text-right font-black text-base"
                  style={{ color: template.accent }}
                >
                  {grandTotal}
                </td>
              </tr>
            </tbody>
          </table>
        </Card>
      )}

      {/* ── History ── */}
      {history.length > 0 && (
        <Card>
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 no-print">
            <h3 className="section-title">Session History</h3>
            <div className="flex items-center gap-2">
              <Badge accent={template.accent}>{history.length}</Badge>
              <Button variant="danger" size="sm" onClick={clearHistory}>
                Clear
              </Button>
            </div>
          </div>
          <div className="divide-y divide-gray-50 no-print">
            {history.slice(0, 15).map(h => (
              <div key={h.id} className="flex items-center justify-between px-5 py-3">
                <div>
                  <p className="text-sm text-gray-700 font-medium">{h.text}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{h.templateName}</p>
                </div>
                <div className="text-right ml-4 shrink-0">
                  <p className="text-xs text-gray-400">{h.time}</p>
                  <p className="text-xs text-gray-400">{h.date}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

    </div>
  )
}

// ─────────────────────────────────────────
//  CALC HEADER (internal component)
// ─────────────────────────────────────────
function CalcHeader({ template }: { template: ReturnType<typeof getTemplateByKey> }) {
  if (!template) return null
  return (
    <div className="mb-2">
      <h2 className="text-xl font-black text-gray-800 flex items-center gap-2">
        <span>{template.icon}</span>
        <span>{template.name}</span>
      </h2>
      <p className="text-sm text-gray-500 mt-1 leading-relaxed max-w-2xl">
        {template.description}
      </p>
    </div>
  )
}