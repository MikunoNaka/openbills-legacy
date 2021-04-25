package main

import (
  "github.com/gin-gonic/gin"
  "github.com/gin-gonic/contrib/static"
)

func main() {
  myRouter := gin.Default()
  myRouter.Use(gin.Logger())

  // serve static front end on /
  myRouter.Use(static.Serve("/", 
    static.LocalFile("./app", true)))

  myRouter.Run(":8080")
}
