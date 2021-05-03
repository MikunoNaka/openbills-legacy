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
  ID    int
  Name  string
  Phone string
  Email string
}

func GetAllPeople() []Person {
  var allPeople []Person
  rows, _ := myDatabase.Query(
    `SELECT id, Name, Phone, Email FROM People`,
  )

  var (
    name, phone, email string
    id int
  )

  for rows.Next() {
    rows.Scan(&id, &name, &phone, &email)
    allPeople = append(allPeople, Person{id, name, phone, email})
  }

  return allPeople
}

func RegisterPerson(person Person) bool {

  register_person, _ := myDatabase.Prepare(
    `INSERT INTO People
    (Name, Phone, Email)
    VALUES (?, ?, ?)`,
  )

  register_person.Exec(
    person.Name, person.Phone, person.Email,
  )

  return true
}
