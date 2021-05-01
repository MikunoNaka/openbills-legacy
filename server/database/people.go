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
  "fmt"
)

type Person struct {
  Name  string
  Phone string
  Email string
}

func GetAllPeople() []Person {
  var allPeople []Person
  rows, _ := myDatabase.Query(
    `SELECT Name, Phone, Email FROM People`,
  )

  var (
    name, phone, email string
  )

  for rows.Next() {
    rows.Scan(&name, &phone, &email)
    allPeople = append(allPeople, Person{name, phone, email})
  }

  return allPeople
}

func RegisterPerson(person Person) bool {
  personNames, _ := myDatabase.Query("SELECT Name FROM People")

  // check if already exists
  // probs shouldnt make it
  // make front end handle it
  for personNames.Next() {
    var rPerson string
    if rPerson == person.Name {
      fmt.Println(person.Name, "already exists")
      return false
    }
  }

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
