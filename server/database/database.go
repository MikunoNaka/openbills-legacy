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
  _ "github.com/mattn/go-sqlite3"
  "database/sql"
)

type Item struct {
  Model  string
  Desc   string `json:"Description"`
  Price  int // *float32
  HSN    int
}


var myDatabase *sql.DB
func init() {
  myDatabase, _ = sql.Open("sqlite3", "./openbills.db")
}

var myItems *sql.Stmt
var addToMyItems *sql.Stmt
func init() {
  myItems, _ = myDatabase.Prepare("CREATE TABLE IF NOT EXISTS RegisteredItems (id INTEGER PRIMARY KEY, model TEXT, desc TEXT, price INTEGER, HSN INTEGER)")
  myItems.Exec()

  addToMyItems, _ = myDatabase.Prepare("INSERT INTO RegisteredItems (id, model, desc, price, hsn) VALUES (?, ?, ?, ?, ?)")
}

func GetAllItems() []Item {
  var allItems []Item
  rows, _ := myDatabase.Query("SELECT model, desc, price, hsn FROM RegisteredItems")

  var model string
  var desc string
  var price int
  var hsn int
  for rows.Next() {
    rows.Scan(&model, &desc, &price, &hsn)
    allItems = append(allItems, Item{model, desc, price, hsn})
  }
  return allItems
}
