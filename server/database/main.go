/*
 * OpenBills - Self hosted browser app to generate and keep track of simple invoices
 * Version - 0
 * Licensed under the MIT license - https://opensource.org/licenses/MIT
 *
 * Copyright (c) 2021 Vidhu Kant Sharma
*/

package database

import (
  "database/sql"
  _ "github.com/mattn/go-sqlite3"
)

var myDatabase *sql.DB
func StartDB() {
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
}

