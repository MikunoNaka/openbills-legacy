package main

import (
  "github.com/gin-gonic/gin"
  // "net/http"
)

func main() {
  myRouter := gin.New()
  // myRouter.Use(gin.Logger())

  myRouter.Static("/app", "./app")

  myRouter.Run(":8080")
}
