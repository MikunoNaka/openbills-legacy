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

  "strconv"
  db "github.com/MikunoNaka/openbills/database"
)

// items API functions
func getAllItems(ctx *gin.Context) {
  ctx.Header("Content-Type", "application/json")
  ctx.JSON(http.StatusOK, db.GetAllItems())
}

func registerItem(ctx *gin.Context) {
  // extract data not string
  price, _ := strconv.ParseFloat(ctx.Query("price"), 64)
  hsn, _ := strconv.Atoi(ctx.Query("hsn"))
  gst, _ := strconv.ParseFloat(ctx.Query("gst"), 64)
  cat := "cat coming soon"
  brand := "brand coming soon"

  item := db.Item {
    Model:       ctx.Query("model"),
    Description: ctx.Query("desc"),
    UnitPrice:   price,
    HSN:         hsn,
    TotalGST:    gst,
    Category:    cat,
    Brand:       brand,
  }

  db.RegisterItem(item)
}
