/*
 * OpenBills - Self hosted browser app to generate and keep track of simple invoices
 * Version - 0
 * Licensed under the MIT license - https://opensource.org/licenses/MIT
 *
 * Copyright (c) 2021 Vidhu Kant Sharma
*/

// backend for OpenBills
// currently HIGHLY under development

package main

import (
  router "github.com/MikunoNaka/openbills/router"
  db "github.com/MikunoNaka/openbills/database"
)

func main() {
  db.InitDB()
  router.InitRouter()
}
