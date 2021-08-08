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
  ID          int
  Name        string
  Phone       string
  Email       string
  BillAddress Address
  ShipAddress Address
}

func GetAllPeople() []Person {
  var allPeople []Person
  rows, _ := myDatabase.Query (
    `SELECT ID, Name, Phone, Email, 

    BillAddressLine, BillAddressCity, 
    BillAddressState, BillAddressPINCode, 
    BillAddressCountry,

    ShipAddressLine, 
    ShipAddressCity, ShipAddressState, 
    ShipAddressPINCode, ShipAddressCountry

    FROM People`,
  )

  var (
    id int
    name, phone, email string
    billAddressLine, billAddressCity, billAddressState, billAddressPINCode, billAddressCountry string
    shipAddressLine, shipAddressCity, shipAddressState, shipAddressPINCode, shipAddressCountry string
    billAddress, shipAddress Address
  )

  for rows.Next() {
    rows.Scan(
      &id, &name, &phone, &email,

      &billAddressLine, &billAddressCity,
      &billAddressState, &billAddressPINCode,
      &billAddressCountry,

      &shipAddressLine, &shipAddressCity,
      &shipAddressState, &shipAddressPINCode,
      &shipAddressCountry,
    )

    billAddress = Address{billAddressLine, billAddressCity, billAddressState, billAddressPINCode, billAddressCountry}
    shipAddress = Address{shipAddressLine, shipAddressCity, shipAddressState, shipAddressPINCode, shipAddressCountry}

    allPeople = append(allPeople, Person{id, name, phone, email, billAddress, shipAddress})
    fmt.Println(allPeople)
  }

  return allPeople
}

func RegisterPerson(person Person) bool {
  fmt.Println(person)
  register_person, _ := myDatabase.Prepare(
    `INSERT INTO People
    (Name, Phone, Email, 

    BillAddressLine, BillAddressCity, 
    BillAddressState, BillAddressPINCode, 
    BillAddressCountry,

    ShipAddressLine, ShipAddressCity, 
    ShipAddressState, ShipAddressPINCode, 
    ShipAddressCountry)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  )

  register_person.Exec(
    person.Name, person.Phone, person.Email, 

    person.BillAddress.AddressLine, 
    person.BillAddress.City, 
    person.BillAddress.State, 
    person.BillAddress.PINCode, 
    person.BillAddress.Country, 

    person.ShipAddress.AddressLine, 
    person.ShipAddress.City, 
    person.ShipAddress.State, 
    person.ShipAddress.PINCode, 
    person.ShipAddress.Country, 
  )

  return true
}
