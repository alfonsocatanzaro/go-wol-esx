package auth

import (
	"fmt"
	"net/http"
	"time"

	"github.com/auth0/go-jwt-middleware"
	"github.com/dgrijalva/jwt-go"
)

var signKey = []byte("HSKJAHSKJ(/&JHBSDAKJHD")

// GetAuthToken create jwt token
var GetAuthToken = http.HandlerFunc(func(res http.ResponseWriter, req *http.Request) {
	token := jwt.New(jwt.SigningMethodHS256)
	claims := token.Claims.(jwt.MapClaims)

	claims["admin"] = true
	claims["name"] = "Alfonso Catanzaro"
	claims["exp"] = time.Now().Add(time.Hour * 24).Unix()

	tokenString, err := token.SignedString(signKey)
	if err != nil {

		fmt.Println(err.Error())
	}
	res.Write([]byte(tokenString))
})

// JwtMiddleware for token validation
var JwtMiddleware = jwtmiddleware.New(jwtmiddleware.Options{
	ValidationKeyGetter: func(token *jwt.Token) (interface{}, error) {
		return signKey, nil
	},
	SigningMethod: jwt.SigningMethodHS256,
})
