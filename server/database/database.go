/*
 * OpenBills - Self hosted browser app to generate and keep track of simple invoices
 * Version - 0
 * Licensed under the MIT license - https://opensource.org/licenses/MIT
 *
 * Copyright (c) 2021 Vidhu Kant Sharma
*/

// Idk how databases work this package is supposed to handle the sqlite database
// will figure that out

package database

import (
  "database/sql"
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

var myDatabase *sql.DB
var register_item *sql.Stmt
func init() {
  myDatabase, _ = sql.Open("sqlite3", "./openbills.db")

  init_registered_items, _ := myDatabase.Prepare(
    `CREATE TABLE IF NOT EXISTS registered_items
    (id INTEGER PRIMARY KEY AUTOINCREMENT,
    model    TEXT NOT NULL,
    desc     TEXT,
    price    REAL,
    hsn      BLOB,
    gst      REAL,
    category TEXT,
    brand    TEXT)`,
  )
  init_registered_items.Exec()

  register_item, _ = myDatabase.Prepare(
    `INSERT INTO registered_items
    (model, desc, price, hsn, gst, category, brand) 
    VALUES (?, ?, ?, ?, ?, ?, ?)`,
  )
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
