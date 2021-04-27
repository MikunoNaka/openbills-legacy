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
  "net/http"
  "github.com/gin-gonic/gin"
  "github.com/gin-gonic/contrib/static"

  // this handles all the database functions
  db "github.com/MikunoNaka/openbills/database"
)

type Item struct {
  Model  string 
  Desc   string `json:"Description"`
  Price  float32
  HSN    int   
}

func main() {
  db.SayHello()
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
  allItems := [6]Item{
    {
      "Kisan Chair",
      "Very Good Chair",
      100,
      9403,
    }, {
      "Supreme Chair",
      "Even Better Chair",
      200,
      9403,
    }, {
      "Action Houseware",
      "Not a chair",
      50,
      69,
    }, {
      "Coirfit Mattress",
      "I wanna sleep",
      900,
      420,
    }, {
      "AVRO Chair",
      "Formerly AVON lol",
      150,
      9403,
    }, {
      "Mystery Item",
      "hehe hehehehe",
      1000,
      177013,
    },
  }

  ctx.Header("Content-Type", "application/json")
  ctx.JSON(http.StatusOK, allItems)
}
