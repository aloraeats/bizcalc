import type { DBEntry } from '@/types'

// ─────────────────────────────────────────
//  Simplified DB using localStorage as
//  fallback until SQLite Wasm is configured
//  This keeps the app working now and we
//  swap to SQLite Wasm later
// ─────────────────────────────────────────

const DB_KEY = 'bizcalc_entries'

function readEntries(): DBEntry[] {
  try {
    const raw = localStorage.getItem(DB_KEY)
    return raw ? (JSON.parse(raw) as DBEntry[]) : []
  } catch {
    return []
  }
}

function writeEntries(entries: DBEntry[]): void {
  try {
    localStorage.setItem(DB_KEY, JSON.stringify(entries))
  } catch {
    console.error('Storage write failed')
  }
}

// ── Init DB (no-op for localStorage) ──
export async function initDB(): Promise<void> {
  console.log('✅ DB ready (localStorage mode)')
}

// ── Save Entry ──
export function saveEntry(entry: Omit<DBEntry, 'id'>): void {
  const entries = readEntries()
  const newEntry: DBEntry = {
    ...entry,
    id: Date.now(),
  }
  entries.unshift(newEntry)
  // keep last 200
  writeEntries(entries.slice(0, 200))
}

// ── Get All Entries ──
export function getAllEntries(templateKey?: string): DBEntry[] {
  const entries = readEntries()
  if (templateKey) {
    return entries.filter(e => e.template_key === templateKey)
  }
  return entries
}

// ── Clear All Entries ──
export function clearAllEntries(): void {
  localStorage.removeItem(DB_KEY)
}

// ── Clear By Template ──
export function clearEntriesByTemplate(templateKey: string): void {
  const entries = readEntries().filter(e => e.template_key !== templateKey)
  writeEntries(entries)
}

// ── DB Status ──
export function isDBReady(): boolean {
  return true
}