```
I am building a web app called BizCalc. It is a Production & Sales 
Calculator PWA (Progressive Web App) built with React, TypeScript, 
Vite and Tailwind CSS v3. I am a solo developer. Here is everything 
you need to know to continue helping me.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
APP CONCEPT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BizCalc is a multi-purpose business calculator that helps businesses 
calculate production yield and sales revenue. It is designed to work 
offline as a PWA. The target users are small businesses like 
restaurants, drink/beverage companies, and any business that wants 
to track production output or sales revenue without depending on 
staff members doing manual calculations.

The core calculation logic is always:
Quantity × Rate/Yield = Total Output

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TECH STACK
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- React 18
- TypeScript 5
- Vite 5
- Tailwind CSS v3 (NOT v4)
- react-router-dom v6
- Zustand (global state management)
- jspdf + jspdf-autotable (PDF export)
- xlsx / SheetJS (Excel/CSV export)
- vite-plugin-pwa (PWA + Service Worker)
- localStorage (current DB — temporary)
- SQLite Wasm + OPFS (planned future DB upgrade)
- Supabase (planned future: auth + sync + payments)
- Paystack (planned future: payment integration)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PROJECT STRUCTURE (12 files)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

bizcalc/
│
├── public/
│   ├── icons/
│   │   ├── icon-192.png
│   │   └── icon-512.png
│
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── index.css
│   │
│   ├── types/
│   │   └── index.ts
│   │
│   ├── data/
│   │   └── templates.ts
│   │
│   ├── store/
│   │   └── useStore.ts
│   │
│   ├── db/
│   │   └── db.ts
│   │
│   ├── utils/
│   │   └── exports.ts
│   │
│   ├── components/
│   │   ├── Navbar.tsx
│   │   └── ui.tsx
│   │
│   └── pages/
│       ├── Home.tsx
│       └── Calculator.tsx
│
├── index.html
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
└── tsconfig.node.json

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CURRENT FEATURES (BUILT)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ 4 Templates on home screen selection
✅ Template 1: Restaurant & Food Production
✅ Template 2: Drink & Beverage Company
✅ Template 3: Sales & Revenue Calculator
✅ Template 4: Custom Calculator
✅ Each template has its own accent color
✅ Each field has label + placeholder + hint text
   (hint text prevents users from entering wrong values)
✅ Measurement unit dropdowns
   (Bag, Kg, Gram, Tonne, Litre, Carton etc)
✅ Dynamic results table (rows and columns)
✅ Summary section with grand total
✅ Session history (last 50 entries via Zustand persist)
✅ Export to PDF (jspdf + autotable)
✅ Export to Excel/CSV (SheetJS)
✅ Delete individual rows
✅ Clear all rows
✅ Enter key to add row
✅ localStorage as current database (temporary)
✅ PWA setup via vite-plugin-pwa
✅ Routing: / (Home) and /calculator/:templateKey
✅ Navbar with back to templates button
✅ Responsive design with Tailwind CSS
✅ Print styles (hides buttons on print)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TEMPLATE DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Template 1 — Restaurant & Food Production
  accent:  #00b894 (green)
  fields:  Raw Material, Quantity, Unit (dropdown),
           Yield Per Unit, Output Name
  formula: Quantity × Yield Per Unit = Total Output
  example: 5 Bags of Corn Dough × 50 = 250 Banku

Template 2 — Drink & Beverage Company
  accent:  #0984e3 (blue)
  fields:  Raw Material, Quantity, Unit (dropdown),
           Yield Per Unit, Output Name
  formula: Quantity × Yield Per Unit = Total Output
  example: 100 Litres of Malt × 12 = 1200 Bottles

Template 3 — Sales & Revenue Calculator
  accent:  #e17055 (orange)
  fields:  Product Name, Quantity Sold,
           Price Per Unit (GHS), Period (dropdown)
  formula: Quantity Sold × Price Per Unit = Total Revenue
  example: 200 Banku × GHS 5 = GHS 1000 (Monthly)
  note:    Grand total shows GHS not Units

Template 4 — Custom Calculator
  accent:  #a29bfe (purple)
  fields:  Entry Name, Quantity, Unit (text - user types own),
           Rate/Yield, Output Name
  formula: Quantity × Rate = Total Output
  note:    Fully flexible, user defines everything

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
IMPORTANT TYPESCRIPT NOTES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- Input and Select components use React.forwardRef
  because Calculator.tsx uses useRef to reference
  each field for validation and clearing after submit
- noUnusedLocals and noUnusedParameters are set
  to false to avoid noise during development
- skipLibCheck is true
- baseUrl was removed because it caused deprecation
  errors in TypeScript 5+. We use paths only.
- tsconfig.node.json has composite: true and
  noEmit: false (required for references to work)
- @/* path alias maps to ./src/*

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
KNOWN ISSUES ALREADY FIXED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- Tailwind v4 init command does not work.
  We force install Tailwind v3:
  npm install -D tailwindcss@3 postcss autoprefixer

- SQLite Wasm was planned but caused import errors.
  Replaced with localStorage temporarily.
  db.ts is already structured for easy SQLite swap later.

- Input and Select had no forwardRef which caused
  ref prop TypeScript errors in Calculator.tsx.
  Fixed with React.forwardRef on both components.

- tsconfig had baseUrl deprecation warning and
  composite reference errors. Both fixed.

- vite.config.ts uses fileURLToPath instead of
  path.resolve to avoid needing extra type config.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DATABASE PLAN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Current:  localStorage (working now)

Planned upgrade path:
  Phase 1 (done):    localStorage
  Phase 2 (next):    SQLite Wasm + OPFS
                     (real persistent browser database
                      stored in protected device storage,
                      cannot be wiped by browser cleanup)
  Phase 3 (future):  Supabase for cloud sync,
                     auth and subscription management

The db.ts file exports these functions:
  initDB()
  saveEntry()
  getAllEntries()
  clearAllEntries()
  clearEntriesByTemplate()
  isDBReady()

These function signatures must stay the same
when we upgrade to SQLite Wasm so nothing else breaks.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STATE MANAGEMENT (ZUSTAND)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Store file: src/store/useStore.ts

State:
  currentTemplate    Template | null
  rows               TableRow[]
  history            HistoryEntry[]
  idCounter          number
  historyIdCounter   number

Actions:
  setTemplate(template)
  addRow(row)
  deleteRow(id)
  clearRows()
  addHistory(entry)
  clearHistory()
  goHome()

Persistence:
  Only history and historyIdCounter are persisted
  to localStorage via zustand/middleware persist.
  rows and currentTemplate reset on page reload
  (this is intentional behavior).

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PLANNED FEATURES (NOT BUILT YET)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SHORT TERM:
  → Upgrade db.ts from localStorage to SQLite Wasm + OPFS
  → PWA install prompt banner (show install button)
  → Better mobile responsive layout
  → Toast notifications instead of alert()

MEDIUM TERM:
  → Supabase Auth (email + password sign in)
  → License key system (stored in Supabase)
  → User account page
  → Data sync between device and Supabase cloud
  → 14 day free trial system

LONG TERM:
  → Paystack payment integration
  → Monthly and yearly subscription plans
  → Multi-branch support
  → Usage analytics dashboard (for developer/owner)
  → More templates (Bakery, Farm, Factory etc)

NOT PLANNED:
  → Multi-branch support (decided against for now)
  → Native mobile app (PWA covers this)
  → App store distribution

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BUSINESS MODEL NOTES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- Target market: Small businesses in Ghana
- Currency used in Sales template: GHS (Ghana Cedis)
- Payment processor planned: Paystack
  (supports Ghana MoMo, card, bank transfer)
- Pricing model ideas:
    Free trial: 14 days
    Basic:      GHS 30/month (1 template)
    Standard:   GHS 60/month (all templates)
    Annual:     GHS 500/year
- For now payments are manual
  (client pays via MoMo, developer activates account)
- Hosting plan: GitHub Pages or Netlify (free tier)
- Domain: custom domain planned (e.g. bizcalc.app)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CODE STYLE PREFERENCES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- Solo developer so keep files merged where possible
- Max 12 source files preferred
- No unnecessary abstraction
- Tailwind for all styling (no separate CSS modules)
- Inline styles only for dynamic values like accent color
- Named exports for UI components
- Default exports for pages and major components
- Comments to separate sections within files
  using ─────────────────── dividers
- TypeScript strict mode but noUnusedLocals false
- All interfaces in one file: src/types/index.ts
- All template definitions in one file: src/data/templates.ts

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
COMMANDS REFERENCE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
npm run dev        → start development server
npm run build      → production build
npm run preview    → preview production build

Install command used:
npm install react-router-dom zustand jspdf 
jspdf-autotable xlsx vite-plugin-pwa 
@sqlite.org/sqlite-wasm

Dev dependencies:
npm install -D tailwindcss@3 postcss autoprefixer 
@types/node

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
WHAT TO CONTINUE WITH NEXT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
The app is currently running on npm run dev.
The next things to work on in order of priority:

1. Fix any remaining TypeScript or runtime errors
2. Test all 4 templates work correctly
3. Test PDF and Excel export
4. Upgrade db.ts to SQLite Wasm + OPFS
5. Add PWA install prompt banner
6. Add Supabase auth (sign in / sign up)
7. Add license key system
8. Payment integration with Paystack
```

---