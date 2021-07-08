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

  //"strconv"
  db "github.com/MikunoNaka/openbills/database"
)

// items API functions
func getAllItems(ctx *gin.Context) {
  ctx.Header("Content-Type", "application/json")
  ctx.JSON(http.StatusOK, db.GetAllItems())
}

func registerItem(ctx *gin.Context) {
  var newItem db.Item
  ctx.Bind(&newItem)
  db.RegisterItem(newItem)
}
