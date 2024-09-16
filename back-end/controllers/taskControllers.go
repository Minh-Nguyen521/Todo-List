package controllers

import (
	"Todo_list/initializers"
	"Todo_list/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

func NewTask(c *gin.Context) {
	var newTaskInput models.NewTaskDTO

	if err := c.ShouldBindJSON(&newTaskInput); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	task := models.Task{
		UserID:      newTaskInput.UserID,
		Title:       newTaskInput.Title,
		Description: newTaskInput.Description,
		Priority:    newTaskInput.Priority,
		Repeat:      newTaskInput.Repeat,
		Status:      newTaskInput.Status,
		Deadline:    newTaskInput.Deadline,
	}

	res := initializers.DB.Create(&task)
	if res.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": res.Error.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "task created",
		"data": gin.H{
			"task": task,
		},
	})
}

func GetTask(c *gin.Context) {
	var task models.Task
	task_id := c.Param("id")

	res := initializers.DB.First(&task, task_id)
	if res.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": res.Error.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "task found",
		"data": gin.H{
			"task": task,
		},
	})
}

func UpdateTask(c *gin.Context) {
	var task models.Task
	task_id := c.Param("id")
	var updateTaskInput models.UpdateTaskDTO

	if err := c.ShouldBindJSON(&updateTaskInput); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	res := initializers.DB.First(&task, task_id)
	if res.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": res.Error.Error()})
		return
	}

	task.Title = updateTaskInput.Title
	task.Description = updateTaskInput.Description
	task.Priority = updateTaskInput.Priority
	task.Repeat = updateTaskInput.Repeat
	task.Status = updateTaskInput.Status
	task.Deadline = updateTaskInput.Deadline

	res = initializers.DB.Save(&task)
	if res.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": res.Error.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "task updated",
		"data": gin.H{
			"task": task,
		},
	})
}

func DeleteTask(c *gin.Context) {
	var task models.Task
	task_id := c.Param("id")

	res := initializers.DB.First(&task, task_id)
	if res.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": res.Error.Error()})
		return
	}

	res = initializers.DB.Delete(&task)
	if res.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": res.Error.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "task deleted",
	})
}
