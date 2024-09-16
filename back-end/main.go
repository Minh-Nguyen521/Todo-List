package main

import (
	"Todo_list/controllers"

	"github.com/gin-gonic/gin"
)

func main() {

	r := gin.Default()

	r.POST("/register", controllers.Register)
	r.POST("/login", controllers.Login)

	r.POST("/new", controllers.NewTask)
	r.GET("/tasks/get/:id", controllers.GetTask)
	r.PUT("/tasks/update/:id", controllers.UpdateTask)
	r.DELETE("/tasks/delete/:id", controllers.DeleteTask)
}
