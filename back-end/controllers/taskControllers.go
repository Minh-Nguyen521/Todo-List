package controllers

import (
	"Todo_list/initializers"
	"Todo_list/models"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

func NewTask(c *gin.Context) {

	user, exists := c.Get("currentUser")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "unauthorized"})
		return
	}

	var newTaskInput models.NewTaskDTO

	if err := c.ShouldBindJSON(&newTaskInput); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}


	task := models.Task{
		UserID:      user.(models.User).UserID,
		Title:       newTaskInput.Title,
		Description: newTaskInput.Description,
		Priority:    newTaskInput.Priority,
		Repeat:      newTaskInput.Repeat,
		Status:      newTaskInput.Status,
		Deadline:    time.Time{},
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
	UserID := c.Param("id")

	var FoundTask []models.Task
	initializers.DB.Where("user_id=?", UserID).Find(&FoundTask)
	
	if len(FoundTask) == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"message": "task not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "task found",
		"data": gin.H{
			"task": FoundTask,
		},
	})
}

func EditTask(c *gin.Context) {
	var task models.Task
	task_id := c.Param("id")
	var EditTaskInput models.EditTaskDTO

	if err := c.ShouldBindJSON(&EditTaskInput); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	res := initializers.DB.First(&task, task_id)
	if res.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": res.Error.Error()})
		return
	}

	task.Title = EditTaskInput.Title
	task.Description = EditTaskInput.Description
	task.Priority = EditTaskInput.Priority
	task.Repeat = EditTaskInput.Repeat
	task.Status = EditTaskInput.Status
	task.Deadline = EditTaskInput.Deadline

	res = initializers.DB.Save(&task)
	if res.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": res.Error.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "task edited",
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
