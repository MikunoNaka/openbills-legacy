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

  "strconv"
  db "github.com/MikunoNaka/openbills/database"
)

func main() {
  db.StartDB()
  myRouter := gin.New()
  myRouter.Use(gin.Logger())

  // serve static front end on /
  myRouter.Use(static.Serve("/", 
    static.LocalFile("./app", true)))

  // define routes
  api := myRouter.Group("/api")
  items := api.Group("/items")

  items.GET("/", getAllItems)
  items.POST("/", registerItem)

  // items.POST("/", registerItem)

  myRouter.Run(":8080")
}

func getAllItems(ctx *gin.Context) {
  ctx.Header("Content-Type", "application/json")
  ctx.JSON(http.StatusOK, db.GetAllItems())
}

func registerItem(ctx *gin.Context) {
  // extract data
  model := ctx.Query("model")
  desc := ctx.Query("desc")
  price, _ := strconv.ParseFloat(ctx.Query("price"), 64)
  hsn, _ := strconv.Atoi(ctx.Query("hsn"))
  gst, _ := strconv.ParseFloat(ctx.Query("gst"), 64)
  cat := "cat coming soon"
  brand := "brand coming soon"

  // why does it show warnings
  item := db.Item {
    model,
    desc,
    price,
    hsn,
    gst,
    cat,
    brand,
  }

  db.RegisterItem(item)
}
