import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import * as XLSX from 'xlsx'
import type { TableRow, Template } from '@/types'

// ─────────────────────────────────────────
//  EXPORT TO PDF
// ─────────────────────────────────────────
export function exportPDF(
  template: Template,
  rows: TableRow[],
  grandTotal: string
): void {
  if (rows.length === 0) {
    alert('No data to export.')
    return
  }

  const doc = new jsPDF()

  // Title
  doc.setFontSize(18)
  doc.setTextColor(40)
  doc.text('BizCalc — Production Report', 14, 20)

  // Template name
  doc.setFontSize(11)
  doc.setTextColor(100)
  doc.text(`Template: ${template.name}`, 14, 30)
  doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 37)

  // Table
  autoTable(doc, {
    startY:      45,
    head:        [template.columns],
    body:        rows.map(r => r.cols),
    headStyles:  { fillColor: hexToRGB(template.accent), textColor: 255, fontStyle: 'bold' },
    alternateRowStyles: { fillColor: [248, 249, 250] },
    styles:      { fontSize: 9, cellPadding: 4 },
    columnStyles: { 0: { fontStyle: 'bold' } },
  })

  // Grand total
  const finalY = (doc as jsPDF & { lastAutoTable: { finalY: number } })
    .lastAutoTable.finalY + 10

  doc.setFontSize(11)
  doc.setTextColor(40)
  doc.setFont('helvetica', 'bold')
  doc.text(`Grand Total: ${grandTotal}`, 14, finalY)

  doc.save(`bizcalc-${template.key}-${Date.now()}.pdf`)
}

// ─────────────────────────────────────────
//  EXPORT TO CSV / EXCEL
// ─────────────────────────────────────────
export function exportCSV(
  template: Template,
  rows: TableRow[]
): void {
  if (rows.length === 0) {
    alert('No data to export.')
    return
  }

  const wsData = [
    template.columns,
    ...rows.map(r => r.cols),
  ]

  const ws = XLSX.utils.aoa_to_sheet(wsData)
  const wb = XLSX.utils.book_new()

  XLSX.utils.book_append_sheet(wb, ws, template.name.slice(0, 31))
  XLSX.writeFile(wb, `bizcalc-${template.key}-${Date.now()}.xlsx`)
}

// ─────────────────────────────────────────
//  HELPER — Hex to RGB for jsPDF
// ─────────────────────────────────────────
function hexToRGB(hex: string): [number, number, number] {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)]
    : [0, 184, 148]
}