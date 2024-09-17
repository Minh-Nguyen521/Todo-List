package controllers

import (
	"Todo_list/initializers"
	"Todo_list/models"
	"net/http"
	"os"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt"
)

func Register(c *gin.Context) {
	var registerInput models.RegisterDTO

	if err := c.ShouldBindJSON(&registerInput); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	var userFound models.User
	initializers.DB.Where("username=?", registerInput.Username).Find(&userFound)


	if userFound.UserID != 0 {
		c.JSON(http.StatusBadRequest, gin.H{"message": "username already used"})
		return
	}

	user := models.User{
		Username: registerInput.Username,
		Password: registerInput.Password,
	}

	res := initializers.DB.Create(&user)
	if res.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": res.Error.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "register success",
	})
}

func Login(c *gin.Context) {

	var loginInput models.LoginDTO

	if err := c.ShouldBindJSON(&loginInput); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	var userFound models.User
	initializers.DB.Where("username=?", loginInput.Username).Find(&userFound)

	if userFound.UserID == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"message": "user not found"})
		return
	}

	if userFound.Password != loginInput.Password {
		c.JSON(http.StatusBadRequest, gin.H{"message": "invalid password"})
		return
	}

	generateToken := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"id":  userFound.UserID,
		"exp": time.Now().Add(time.Hour * 24).Unix(),
	})

	token, err := generateToken.SignedString([]byte(os.Getenv("SECRET")))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "failed to generate token"})
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "login success",
		"data": gin.H{
			"token": token,
			"userID" : userFound.UserID,
			"username": userFound.Username,
		},
	})
}
