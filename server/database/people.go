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
  Name    string
  Address string
  Phone   string
  Email   string
}

func GetAllPeople() []Person {
  var allPeople []Person
  rows, _ := myDatabase.Query(
    `SELECT Name, Address, Phone, Email FROM People`,
  )

  var (
    name, address, phone, email string
  )

  for rows.Next() {
    rows.Scan(&name, &address, &phone, &email)
    allPeople = append(allPeople, Person{name, address, phone, email})
  }

  return allPeople
}

func RegisterPerson(person Person) bool {
  register_person, _ := myDatabase.Prepare(
    `INSERT INTO People
    (Name, Address, Phone, Email)
    VALUES (?, ?, ?, ?)`,
  )

  register_person.Exec(
    person.Name, person.Address, person.Phone, person.Email,
  )

  return true
}
