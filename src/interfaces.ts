export interface Transport {
  name: string,
  vehicleNum: string,
  method: string,
  gstin: string,
  builty: string
}

export interface Item {
  Model: string,
  Description: string,
  Quantity: number,
  UnitPrice: number,
  TotalValue: number, // UnitPrice * Quantity
  Discount: number,
  HSN: number, // string??

  sgst: number,
  cgst: number,
  igst: number
}
