/*
 * OpenBills - Self hosted browser app to generate and keep track of simple invoices
 * Version - 0
 * Licensed under the MIT license - https://opensource.org/licenses/MIT
 *
 * Copyright (c) 2021 Vidhu Kant Sharma
*/

// handles all People related database functions
package database 

import (
  _ "github.com/mattn/go-sqlite3"
)



type Person struct {
  ID          int
  Name        string
  Phone       string
  Email       string
  BillAddress Address
  ShipAddress Address
  GSTIN       string
}

func GetAllPeople() []Person {
  var allPeople []Person
  rows, _ := myDatabase.Query (
    `SELECT ID, Name, Phone, Email, BillAddress, ShipAddress, GSTIN FROM People`,
  )

  var (
    id int
    name, phone, email, gstin string
    billAddress, shipAddress Address
  )

  for rows.Next() {
    rows.Scan(&id, &name, &phone, &email, &billAddress, &shipAddress, &gstin)
    allPeople = append(allPeople, Person{id, name, phone, email, billAddress, shipAddress, gstin})
  }

  return allPeople
}

func RegisterPerson(person Person) bool {
  register_person, _ := myDatabase.Prepare(
    `INSERT INTO People
    (Name, Phone, Email, BillAddress, ShipAddress, GSTIN)
    VALUES (?, ?, ?, ?, ?, ?)`,
  )

  register_person.Exec(
    person.Name, person.Phone, person.Email, person.BillAddress, person.ShipAddress, person.GSTIN,
  )

  return true
}
