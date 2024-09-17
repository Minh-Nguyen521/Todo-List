package main

import (
	"Todo_list/controllers"
	"Todo_list/initializers"
	"Todo_list/middlewares"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func init() {
	initializers.LoadEnvs()
	initializers.ConnectDB()
}

func main() {

	r := gin.Default()

	config := cors.Config{
		AllowOrigins:     []string{"http://localhost:5173"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Authorization", "Content-Type"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}
	r.Use(cors.New(config))

	r.POST("/register", controllers.Register)
	r.POST("/login", controllers.Login)

	r.Use(middlewares.CheckAuth)
	{
		r.POST("/task/new", controllers.NewTask)
		r.GET("/tasks/get/:id", controllers.GetTask)
		r.PUT("/tasks/edit/:id", controllers.EditTask)
		r.DELETE("/tasks/delete/:id", controllers.DeleteTask)
	}
	r.Run();
}
