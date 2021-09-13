import { Item, NewItem, Address } from "./interfaces"

export const DummyItem: Item = {
  Model: "",
  Description: "",
  Quantity: 0,
  UnitPrice: 0,
  TotalValue: 0,
  Discount: 0,
  DiscountValue: 0,
  HSN: "",
  TotalGST: 0,
  SGST: 0,
  CGST: 0,
  IGST: 0,
  TotalGSTValue: 0,
  Brand: "",
  Category: ""
}

export const DummyNewItem: NewItem = {
  Model: "",
  Description: "",
  UnitPrice: 0,
  HSN: "",
  TotalGST: 0,
  Brand: "",
  Category: ""
}

export const DummyAddress: Address = {
  AddressLine: "",
  City: "",
  State: "",
  PINCode: "",
  Country: ""
}

