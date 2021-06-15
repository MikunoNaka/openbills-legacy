/*
 * OpenBills - Self hosted browser app to generate and keep track of simple invoices
 * Version - 0
 * Licensed under the MIT license - https://opensource.org/licenses/MIT
 *
 * Copyright (c) 2021 Vidhu Kant Sharma
*/

package router

import (
  "github.com/gin-gonic/gin"
  "net/http"

  db "github.com/MikunoNaka/openbills/database"
)

// people API functions
func getAllPeople(ctx *gin.Context) {
  ctx.Header("Content-Type", "application/json")
  ctx.JSON(http.StatusOK, db.GetAllPeople())
}

func registerPerson(ctx *gin.Context) {
  person := db.Person {
    Name:     ctx.Query("name"),
    Address:  ctx.Query("address"),
    Phone:    ctx.Query("phone"),
    Email:    ctx.Query("email"),
  }

  db.RegisterPerson(person)
}
