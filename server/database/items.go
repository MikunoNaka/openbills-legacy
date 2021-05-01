/*
 * OpenBills - Self hosted browser app to generate and keep track of simple invoices
 * Version - 0
 * Licensed under the MIT license - https://opensource.org/licenses/MIT
 *
 * Copyright (c) 2021 Vidhu Kant Sharma
*/

// handles all Items related database functions

package database

import (
  _ "github.com/mattn/go-sqlite3"
)

type Item struct {
  Model  string
  Desc   string `json:"Description"`
  Price  float64
  HSN    int
  GST    float64
  Cat    string `json:"Category"`
  Brand  string
}

func GetAllItems() []Item {
  var allItems []Item
  rows, _ := myDatabase.Query(
    `SELECT model, desc, price, hsn, gst, category, brand FROM registered_items`,
  )

  var (
    model, desc, cat, brand string
    price, GST float64
    HSN int
  )

  for rows.Next() {
    rows.Scan(&model, &desc, &price, &HSN, &GST, &cat, &brand)
    allItems = append(allItems, Item{model, desc, price, HSN, GST, cat, brand})
  }

  return allItems
}

func RegisterItem(item Item) bool {
  itemNames, _ := myDatabase.Query("SELECT model FROM registered_items")

  register_item, _ := myDatabase.Prepare(
    `INSERT INTO registered_items
    (model, desc, price, hsn, gst, category, brand) 
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
    item.Model, item.Desc,
    item.Price, item.HSN,
    item.GST,   item.Cat,
    item.Brand,
  )
  return true
}
