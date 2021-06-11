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
  people := api.Group("/people")
  items := api.Group("/items")

  // items API routes
  items.GET("/get-all", getAllItems)
  items.POST("/register", registerItem)


  // people API routes
  people.GET("/get-all", getAllPeople)
  people.POST("/register", registerPerson)

  myRouter.Run(":8080")
}

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
    Model: ctx.Query("model"),
    Desc:  ctx.Query("desc"),
    Price: price,
    HSN:   hsn,
    GST:   gst,
    Cat:   cat,
    Brand: brand,
  }

  db.RegisterItem(item)
}

// people API functions
func getAllPeople(ctx *gin.Context) {
  // ctx.Header("Content-Type", "application/json")
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
