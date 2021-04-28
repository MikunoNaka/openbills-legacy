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
  "github.com/gin-gonic/gin"
  "github.com/gin-gonic/contrib/static"
  "net/http"

  // this handles all the database functions
  db "github.com/MikunoNaka/openbills/database"
)

func main() {
  myRouter := gin.New()
  myRouter.Use(gin.Logger())

  // serve static front end on /
  myRouter.Use(static.Serve("/", 
    static.LocalFile("./app", true)))

  // define routes
  api := myRouter.Group("/api")
  items := api.Group("/items")

  items.GET("/", getAllItems)

  myRouter.Run(":8080")
}

func getAllItems(ctx *gin.Context) {
  ctx.Header("Content-Type", "application/json")
  ctx.JSON(http.StatusOK, db.GetAllItems())
}
