export interface Transport {
  Name: string
  VehicleNum: string
  Method: string
  GSTIN: string
  Builty: string
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
  Brand: string
  Category: string
}

// for registering new item to DB
export interface NewItem {
  Model: string
  Description: string
  UnitPrice: number // price without tax/discount
  HSN: string
  TotalGST: number // gst percentage
  Brand: string
  Category: string
}

export interface Address {
  AddressLine: string
  City: string
  State: string
  PINCode: string
  Country: string
}

export interface Person {
  ID?: number
  Name: string
  Phone?: string
  Email?: string
  BillAddress: Address
  ShipAddress?: Address
  Address?: string // to be removed
}

export interface Invoice {
  //Client: Person
  Items: Item[]
  Transport: Transport
}

export interface InvoiceSummary {
  TotalQuantity: number
  TotalRawPrice: number // total price without gst/discount
  TotalDiscount: number // total amount of discount
  TotalGST: number // total gst to be paid
  TotalPriceAfterDiscount: number
  TotalPriceAfterGST: number
  TotalRoundedOff: number
}
