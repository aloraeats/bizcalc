import type { Template } from '@/types'

// ─────────────────────────────────────────
//  MEASUREMENT UNITS
// ─────────────────────────────────────────
const foodUnits   = ['Bag', 'Kg', 'Gram', 'Tonne', 'Litre', 'Carton', 'Crate', 'Piece']
const drinkUnits  = ['Litre', 'Kg', 'Gram', 'Carton', 'Bag', 'Tonne', 'Gallon', 'Barrel']
const periods     = ['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly']

// ─────────────────────────────────────────
//  TEMPLATE 1 — RESTAURANT
// ─────────────────────────────────────────
const restaurantTemplate: Template = {
  key:         'restaurant',
  accent:      '#00b894',
  icon:        '🍽️',
  name:        'Restaurant & Food Production',
  badge:       'Food & Catering',
  description: 'Calculate how many finished food products your raw materials will produce. Enter each raw material, how many units you have, and the yield per unit.',
  cardDescription: 'Perfect for restaurants, canteens, food vendors and caterers.',
  tableTitle:  'Raw Materials & Food Output',
  columns:     ['Raw Material', 'Quantity', 'Unit', 'Yield Per Unit', 'Output Name', 'Total Output'],

  fields: [
    {
      id:          'f_name',
      label:       'Raw Material',
      placeholder: 'e.g. Corn Dough, Beans, Rice',
      hint:        'Enter the name of the raw material you are using',
      type:        'text',
    },
    {
      id:          'f_qty',
      label:       'Quantity',
      placeholder: 'e.g. 5',
      hint:        'How many bags, kg or units of this material do you have',
      type:        'number',
    },
    {
      id:          'f_unit',
      label:       'Measurement Unit',
      placeholder: '',
      hint:        'Select how this raw material is measured',
      type:        'select',
      options:     foodUnits,
    },
    {
      id:          'f_yield',
      label:       'Yield Per Unit',
      placeholder: 'e.g. 50',
      hint:        'How many finished food items does one bag or unit produce',
      type:        'number',
    },
    {
      id:          'f_output',
      label:       'Output / Finished Product Name',
      placeholder: 'e.g. Banku, Portions, Meals',
      hint:        'What is the name of the finished food product',
      type:        'text',
    },
  ],

  calculate(fields) {
    const name   = fields.f_name   as string
    const qty    = fields.f_qty    as number
    const unit   = fields.f_unit   as string
    const yield_ = fields.f_yield  as number
    const output = fields.f_output as string
    const total  = qty * yield_

    return {
      cols: [
        name,
        `${qty} ${unit}`,
        unit,
        String(yield_),
        output,
        `${total.toLocaleString()} ${output}`,
      ],
      summaryLabel: name,
      summaryValue: `${total.toLocaleString()} ${output}`,
      historyText:  `${name} — ${qty} ${unit} × ${yield_} = ${total.toLocaleString()} ${output}`,
      numericTotal: total,
    }
  },
}

// ─────────────────────────────────────────
//  TEMPLATE 2 — DRINK & BEVERAGE
// ─────────────────────────────────────────
const drinkTemplate: Template = {
  key:         'drink',
  accent:      '#0984e3',
  icon:        '🥤',
  name:        'Drink & Beverage Company',
  badge:       'Beverage',
  description: 'Calculate how many bottles, crates or sachets your raw materials will produce. Specify your raw material, quantity and how many finished units each produces.',
  cardDescription: 'Perfect for water companies, juice producers, breweries and soft drink makers.',
  tableTitle:  'Raw Materials & Beverage Output',
  columns:     ['Raw Material', 'Quantity', 'Unit', 'Yield Per Unit', 'Output Name', 'Total Output'],

  fields: [
    {
      id:          'f_name',
      label:       'Raw Material',
      placeholder: 'e.g. Malt, Sugar, Water, Concentrate',
      hint:        'Enter the name of the raw material you are using',
      type:        'text',
    },
    {
      id:          'f_qty',
      label:       'Quantity',
      placeholder: 'e.g. 100',
      hint:        'How many litres, kg or cartons of this material do you have',
      type:        'number',
    },
    {
      id:          'f_unit',
      label:       'Measurement Unit',
      placeholder: '',
      hint:        'Select how this raw material is measured',
      type:        'select',
      options:     drinkUnits,
    },
    {
      id:          'f_yield',
      label:       'Yield Per Unit',
      placeholder: 'e.g. 12',
      hint:        'How many bottles or crates does one litre or kg produce',
      type:        'number',
    },
    {
      id:          'f_output',
      label:       'Output / Finished Product Name',
      placeholder: 'e.g. Bottles, Crates, Sachets, Packs',
      hint:        'What is the name of the finished beverage product',
      type:        'text',
    },
  ],

  calculate(fields) {
    const name   = fields.f_name   as string
    const qty    = fields.f_qty    as number
    const unit   = fields.f_unit   as string
    const yield_ = fields.f_yield  as number
    const output = fields.f_output as string
    const total  = qty * yield_

    return {
      cols: [
        name,
        `${qty} ${unit}`,
        unit,
        String(yield_),
        output,
        `${total.toLocaleString()} ${output}`,
      ],
      summaryLabel: name,
      summaryValue: `${total.toLocaleString()} ${output}`,
      historyText:  `${name} — ${qty} ${unit} × ${yield_} = ${total.toLocaleString()} ${output}`,
      numericTotal: total,
    }
  },
}

// ─────────────────────────────────────────
//  TEMPLATE 3 — SALES & REVENUE
// ─────────────────────────────────────────
const salesTemplate: Template = {
  key:         'sales',
  accent:      '#e17055',
  icon:        '💰',
  name:        'Sales & Revenue Calculator',
  badge:       'Sales & Revenue',
  description: 'Track your total revenue from products sold. Enter each product name, quantity sold, price per unit and the period. The calculator shows revenue per product and your grand total.',
  cardDescription: 'Perfect for any business tracking daily, monthly or yearly sales and earnings.',
  tableTitle:  'Products & Revenue',
  columns:     ['Product Name', 'Qty Sold', 'Price Per Unit', 'Period', 'Total Revenue'],

  fields: [
    {
      id:          'f_name',
      label:       'Product Name',
      placeholder: 'e.g. Banku, Sobolo, Bread, Rice Water',
      hint:        'Enter the name of the product you are selling',
      type:        'text',
    },
    {
      id:          'f_qty',
      label:       'Quantity Sold',
      placeholder: 'e.g. 200',
      hint:        'How many units of this product were sold in the selected period',
      type:        'number',
    },
    {
      id:          'f_price',
      label:       'Price Per Unit (GHS)',
      placeholder: 'e.g. 5.00',
      hint:        'How much does one unit of this product sell for in Ghana Cedis',
      type:        'number',
    },
    {
      id:          'f_period',
      label:       'Sales Period',
      placeholder: '',
      hint:        'Select the time period these sales figures cover',
      type:        'select',
      options:     periods,
    },
  ],

  calculate(fields) {
    const name   = fields.f_name   as string
    const qty    = fields.f_qty    as number
    const price  = fields.f_price  as number
    const period = fields.f_period as string
    const total  = qty * price

    return {
      cols: [
        name,
        qty.toLocaleString(),
        `GHS ${price.toFixed(2)}`,
        period,
        `GHS ${total.toLocaleString()}`,
      ],
      summaryLabel: `${name} (${period})`,
      summaryValue: `GHS ${total.toLocaleString()}`,
      historyText:  `${name} — ${qty} units × GHS ${price.toFixed(2)} = GHS ${total.toLocaleString()} (${period})`,
      numericTotal: total,
    }
  },
}

// ─────────────────────────────────────────
//  TEMPLATE 4 — CUSTOM
// ─────────────────────────────────────────
const customTemplate: Template = {
  key:         'custom',
  accent:      '#a29bfe',
  icon:        '⚙️',
  name:        'Custom Calculator',
  badge:       'Custom',
  description: 'Build your own calculator. Define your own entry names, measurement units and output. This works for any industry or business not covered by the other templates.',
  cardDescription: 'Works for any sector. You define everything yourself.',
  tableTitle:  'Custom Entries & Output',
  columns:     ['Entry Name', 'Quantity', 'Unit', 'Rate / Yield', 'Output Name', 'Total Output'],

  fields: [
    {
      id:          'f_name',
      label:       'Entry Name',
      placeholder: 'e.g. Seeds, Raw Hide, Fabric, Timber',
      hint:        'Name whatever you are measuring or tracking',
      type:        'text',
    },
    {
      id:          'f_qty',
      label:       'Quantity',
      placeholder: 'e.g. 10',
      hint:        'How many units do you have or want to calculate',
      type:        'number',
    },
    {
      id:          'f_unit',
      label:       'Your Unit of Measurement',
      placeholder: 'e.g. Kg, Bags, Litres, Rolls, Metres',
      hint:        'Type your own unit. This is completely flexible',
      type:        'text',
    },
    {
      id:          'f_yield',
      label:       'Rate or Yield Per Unit',
      placeholder: 'e.g. 20',
      hint:        'How much output or value does one unit produce',
      type:        'number',
    },
    {
      id:          'f_output',
      label:       'Output Name',
      placeholder: 'e.g. Pieces, Units, Finished Goods',
      hint:        'What do you call the result or finished output',
      type:        'text',
    },
  ],

  calculate(fields) {
    const name   = fields.f_name   as string
    const qty    = fields.f_qty    as number
    const unit   = fields.f_unit   as string
    const yield_ = fields.f_yield  as number
    const output = fields.f_output as string
    const total  = qty * yield_

    return {
      cols: [
        name,
        `${qty} ${unit}`,
        unit,
        String(yield_),
        output,
        `${total.toLocaleString()} ${output}`,
      ],
      summaryLabel: name,
      summaryValue: `${total.toLocaleString()} ${output}`,
      historyText:  `${name} — ${qty} ${unit} × ${yield_} = ${total.toLocaleString()} ${output}`,
      numericTotal: total,
    }
  },
}

// ─────────────────────────────────────────
//  EXPORT ALL TEMPLATES
// ─────────────────────────────────────────
export const templates: Template[] = [
  restaurantTemplate,
  drinkTemplate,
  salesTemplate,
  customTemplate,
]

export const getTemplateByKey = (key: string): Template | undefined =>
  templates.find(t => t.key === key)