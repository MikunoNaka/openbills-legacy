package main

import (
  "net/http"
  "github.com/gin-gonic/gin"
  "github.com/gin-gonic/contrib/static"
)

type Item struct {
  Model  string 
  Desc   string `json:"Description"`
  Price  float32
  HSN    int   
}

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
  allItems := [1]Item{
    {
      "Kisan Chair",
      "Very Good Chair",
      100,
      9403,
    },
  }

  ctx.JSON(http.StatusOK, allItems)
}
