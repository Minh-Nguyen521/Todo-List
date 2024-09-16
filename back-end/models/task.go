package models

type Task struct {
	TaskID      uint   `gorm:"primaryKey"`
	UserID      uint   `gorm:"not null"`
	Title       string `gorm:"not null"`
	Description string `gorm:"not null"`
	Priority    string `gorm:"not null"`
	Repeat      string `gorm:"default:false"`
	Status      string `gorm:"default:false"`
	Deadline    string `gorm:"default:false"`
}

type NewTaskDTO struct {
	TaskID      uint   `json:"task_id"`
	UserID      uint   `json:"user_id"`
	Title       string `json:"title" binding:"required"`
	Description string `json:"description" binding:"required"`
	Priority    string `json:"priority" binding:"required"`
	Repeat      string `json:"repeat"`
	Status      string `json:"status"`
	Deadline    string `json:"deadline"`
}

type UpdateTaskDTO struct {
	Title       string `json:"title"`
	Description string `json:"description"`
	Priority    string `json:"priority"`
	Repeat      string `json:"repeat"`
	Status      string `json:"status"`
	Deadline    string `json:"deadline"`
}
