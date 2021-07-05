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
func InitDB() {
  myDatabase, _ = sql.Open("sqlite3", "./openbills.db")

  init_items, _ := myDatabase.Prepare(
    `CREATE TABLE IF NOT EXISTS Items
    (id INTEGER PRIMARY KEY AUTOINCREMENT,
    Model     TEXT NOT NULL,
    Desc      TEXT,
    UnitPrice REAL,
    HSN       TEXT,
    TotalGST  REAL,
    Category  TEXT,
    Brand     TEXT)`,
  )
  init_items.Exec()

  init_people, _ := myDatabase.Prepare(
    `CREATE TABLE IF NOT EXISTS People
    (id INTEGER PRIMARY KEY AUTOINCREMENT,
    Name     TEXT,
    Address  TEXT,
    Phone    TEXT,
    Email    TEXT)`,
  )
  init_people.Exec()

  init_invoices, _ := myDatabase.Prepare(
    `CREATE TABLE IF NOT EXISTS Invoices
    (id INTEGER PRIMARY KEY AUTOINCREMENT,
    Data       BLOB NOT NULL,
    Created_on DATETIME)`,
  )
  init_invoices.Exec()
}

