/*
 * OpenBills - Self hosted browser app to generate and keep track of simple invoices
 * Version - 0
 * Licensed under the MIT license - https://opensource.org/licenses/MIT
 * Copyright (c) 2021 Vidhu Kant Sharma
*/

package database

import (
  _ "github.com/mattn/go-sqlite3"
)

type Transport struct {
  Name       string
  VehicleNum string
  Method     string
  GSTIN      string
  Builty     string
}

/*
func GetAllItems() []Item {
  var allItems []Item
  rows, _ := myDatabase.Query(
    `SELECT Model, Desc, UnitPrice, HSN, TotalGST, Category, Brand FROM Items`,
  )

  var (
    model, desc, cat, brand string
    unitPrice, GST float64
    HSN string
  )

  for rows.Next() {
    rows.Scan(&model, &desc, &unitPrice, &HSN, &GST, &cat, &brand)
    allItems = append(allItems, Item{model, desc, unitPrice, HSN, GST, cat, brand})
  }

  return allItems
}

func RegisterItem(item Item) bool {
  itemNames, _ := myDatabase.Query("SELECT model FROM Items")

  register_item, _ := myDatabase.Prepare(
    `INSERT INTO Items
    (Model, Desc, UnitPrice, HSN, TotalGST, Category, Brand) 
    VALUES (?, ?, ?, ?, ?, ?, ?)`,
  )

  // check if item already exists
  // probably this should be handled by front end
  // so we can check this without need of using api
  for itemNames.Next() {
    var rModel string
    itemNames.Scan(&rModel)
    if rModel == item.Model {
      return false
    }
  }

  register_item.Exec(
    item.Model, item.Description, item.UnitPrice, item.HSN,
    item.TotalGST, item.Category, item.Brand,
  )

  return true
}
*/
