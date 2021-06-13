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

type User struct {
  Name, Email string
}

func GetAllUsers() []User {
  var allUsers []User
  rows, _ := myDatabase.Query(
    `SELECT Name, Email FROM Users`,
  )

  var (
    name, email string
  )

  for rows.Next() {
    rows.Scan(&name, &email)
    allUsers = append(allUsers, User{name, email})
  }

  return allUsers
}

// to be added soon
/*
func RegisterUser(item Item) bool {
  itemNames, _ := myDatabase.Query("SELECT model FROM Items")

  register_item, _ := myDatabase.Prepare(
    `INSERT INTO Items
    (Model, Desc, Price, Hsn, Gst, Category, Brand) 
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
*/
