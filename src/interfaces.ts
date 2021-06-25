export interface Transport {
  name: string
  vehicleNum: string
  method: string
  gstin: string
  builty: string
}

export interface Item {
  Model: string
  Description: string
  Quantity: number
  UnitPrice: number // price without tax/discount
  TotalValue: number // UnitPrice * Quantity
  Discount: number // percentage of discount
  DiscountValue: number
  HSN: string

  TotalGST: number // gst percentage
  SGST: number | boolean
  CGST: number | boolean
  IGST: number | boolean
  TotalGSTValue: number // total tax
  // category and brand
}

// for registering new item to DB
export interface NewItem {
  Model: string
  Description: string
  UnitPrice: number // price without tax/discount
  HSN: string
  TotalGST: number // gst percentage
  // category and brand
}

export interface Person {
  Name: string
  Address: string
  Phone: string
  Email: string
}
