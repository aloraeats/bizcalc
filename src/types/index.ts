// ─────────────────────────────────────────
//  FIELD DEFINITION
// ─────────────────────────────────────────
export interface TemplateField {
  id: string
  label: string
  placeholder: string
  hint: string
  type: 'text' | 'number' | 'select'
  options?: string[]
}

// ─────────────────────────────────────────
//  CALCULATION RESULT
// ─────────────────────────────────────────
export interface CalculationResult {
  cols: string[]
  summaryLabel: string
  summaryValue: string
  historyText: string
  numericTotal: number
}

// ─────────────────────────────────────────
//  TEMPLATE
// ─────────────────────────────────────────
export interface Template {
  key: string
  accent: string
  icon: string
  name: string
  badge: string
  description: string
  cardDescription: string
  tableTitle: string
  columns: string[]
  fields: TemplateField[]
  calculate: (fields: Record<string, string | number>) => CalculationResult
}

// ─────────────────────────────────────────
//  TABLE ROW
// ─────────────────────────────────────────
export interface TableRow {
  id: number
  cols: string[]
}

// ─────────────────────────────────────────
//  HISTORY ENTRY
// ─────────────────────────────────────────
export interface HistoryEntry {
  id: number
  text: string
  time: string
  date: string
  templateKey: string
  templateName: string
}

// ─────────────────────────────────────────
//  STORE STATE
// ─────────────────────────────────────────
export interface CalculatorState {
  currentTemplate: Template | null
  rows: TableRow[]
  history: HistoryEntry[]
  idCounter: number
  historyIdCounter: number

  setTemplate: (template: Template) => void
  addRow: (row: Omit<TableRow, 'id'>) => void
  deleteRow: (id: number) => void
  clearRows: () => void
  addHistory: (entry: Omit<HistoryEntry, 'id'>) => void
  clearHistory: () => void
  goHome: () => void
}

// ─────────────────────────────────────────
//  DB ENTRY (SQLite)
// ─────────────────────────────────────────
export interface DBEntry {
  id?: number
  template_key: string
  template_name: string
  entry_text: string
  numeric_total: number
  created_at: string
}