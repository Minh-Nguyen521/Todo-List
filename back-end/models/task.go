package models

import "time"

type Task struct {
	TaskID      uint      `gorm:"primaryKey"`
	UserID      uint      `gorm:"not null"`
	Title       string    `gorm:"not null"`
	Description string    `gorm:"not null"`
	Priority    uint      `gorm:"not null"`
	Repeat      bool      `gorm:"default:false"`
	Status      bool      `gorm:"default:false"`
	Deadline    time.Time `gorm:"default:null"`
}

type NewTaskDTO struct {
	TaskID      uint   `json:"task_id"`
	UserID      uint   `json:"user_id"`
	Title       string `json:"title" binding:"required"`
	Description string `json:"description" binding:"required"`
	Priority    uint   `json:"priority" binding:"required"`
	Repeat      bool   `json:"repeat"`
	Status      bool   `json:"status"`
	Deadline    time.Time `json:"deadline"` // You can parse this into a time.Time in the handler
}

type EditTaskDTO struct {
	Title       string `json:"title"`
	Description string `json:"description"`
	Priority    uint   `json:"priority"`
	Repeat      bool   `json:"repeat"`
	Status      bool   `json:"status"`
	Deadline    time.Time `json:"deadline"` // Again, parse this into time.Time in the handler
}
