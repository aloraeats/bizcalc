import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CalculatorState, TableRow, HistoryEntry, Template } from '@/types'

const useStore = create<CalculatorState>()(
  persist(
    (set, get) => ({
      // ── State ──
      currentTemplate:    null,
      rows:               [],
      history:            [],
      idCounter:          1,
      historyIdCounter:   1,

      // ── Set Template ──
      setTemplate: (template: Template) =>
        set({
          currentTemplate: template,
          rows:            [],
          idCounter:       1,
        }),

      // ── Add Row ──
      addRow: (row: Omit<TableRow, 'id'>) =>
        set(state => ({
          rows:      [...state.rows, { ...row, id: state.idCounter }],
          idCounter: state.idCounter + 1,
        })),

      // ── Delete Row ──
      deleteRow: (id: number) =>
        set(state => ({
          rows: state.rows.filter(r => r.id !== id),
        })),

      // ── Clear Rows ──
      clearRows: () => set({ rows: [], idCounter: 1 }),

      // ── Add History ──
      addHistory: (entry: Omit<HistoryEntry, 'id'>) =>
        set(state => ({
          history: [
            { ...entry, id: state.historyIdCounter },
            ...state.history,
          ].slice(0, 50), // keep last 50
          historyIdCounter: state.historyIdCounter + 1,
        })),

      // ── Clear History ──
      clearHistory: () => set({ history: [], historyIdCounter: 1 }),

      // ── Go Home ──
      goHome: () =>
        set({
          currentTemplate: null,
          rows:            [],
          idCounter:       1,
        }),
    }),
    {
      name:    'bizcalc-store',
      // only persist history between sessions
      // rows and currentTemplate reset on reload (intentional)
      partialize: (state) => ({
        history:          state.history,
        historyIdCounter: state.historyIdCounter,
      }),
    }
  )
)

export default useStore