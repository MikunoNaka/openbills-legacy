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
  //"net/http"
  "fmt"

  db "github.com/MikunoNaka/openbills/database"
)

// func getAllInvoices(ctx *gin.Context) {
//   ctx.Header("Content-Type", "application/json")
//   ctx.JSON(http.StatusOK, db.GetAllItems())
// }

// func registerInvoices(ctx *gin.Context) {
//   var newItem db.Item
//   ctx.Bind(&newItem)
//   db.RegisterItem(newItem)
// }

func registerInvoice(ctx *gin.Context) {
  var newInvoice db.Invoice
  ctx.Bind(&newInvoice)
  fmt.Println(newInvoice)
}
