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
}

var myDatabase *sql.DB
var registered_items *sql.Stmt
var register_item *sql.Stmt
func init() {
  myDatabase, _ = sql.Open("sqlite3", "./openbills.db")

  registered_items, _ = myDatabase.Prepare(
    `CREATE TABLE IF NOT EXISTS registered_items
    (id INTEGER PRIMARY KEY AUTOINCREMENT,
    model TEXT NOT NULL,
    desc TEXT,
    price REAL,
    hsn BLOB)`,
  )
  registered_items.Exec()

  register_item, _ = myDatabase.Prepare(
    `INSERT INTO registered_items
    (model, desc, price, hsn) 
    VALUES (?, ?, ?, ?)`,
  )
}

func GetAllItems() []Item {
  var allItems []Item
  rows, _ := myDatabase.Query(
    `SELECT model, desc, price, hsn FROM registered_items`,
  )

  var (
    model, desc string
    price float64
    HSN int
  )

  for rows.Next() {
    rows.Scan(&model, &desc, &price, &HSN)
    allItems = append(allItems, Item{model, desc, price, HSN})
  }

  return allItems
}

func RegisterItem(model string, desc string, price float64, HSN int) {
  /*
  var item Item = Item{
    model, desc, price, HSN,
  }

  register_item.Exec(item.Model, item.Desc, item.Price, item.HSN)
  */
  register_item.Exec(model, desc, price, HSN)
}
