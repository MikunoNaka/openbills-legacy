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
  "github.com/gin-gonic/contrib/static"
)

func InitRouter() {
  myRouter := gin.New()
  myRouter.Use(gin.Logger())

  // serve static front end on /
  myRouter.Use(static.Serve("/", 
    static.LocalFile("./app", true)))

  // define routes
  api := myRouter.Group("/api")
  people := api.Group("/people")
  items := api.Group("/items")
  users := api.Group("/users")

  // items API routes
  items.GET("/get-all", getAllItems)
  items.POST("/register", registerItem)


  // people API routes
  people.GET("/get-all", getAllPeople)
  people.POST("/register", registerPerson)

  // users API routes
  users.GET("/get-all", getAllUsers)
  // users.POST("/register", registerUser)
  
  myRouter.Run(":8080")
}
