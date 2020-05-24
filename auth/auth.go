package auth

import (
	"encoding/json"
	"fmt"
	"net/http"
	"path"
	"time"

	"github.com/auth0/go-jwt-middleware"
	"github.com/dgrijalva/jwt-go"
	"github.com/tg123/go-htpasswd"
)

var signKey = []byte("HSKJAHSKJ(/&JHBSDAKJHD")

// LoginHandler Validate username and password and return jwt token
func LoginHandler(dataPath string) http.HandlerFunc {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusOK)
			return
		}

		if r.Method != http.MethodPost {
			http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
			return
		}

		var loginPayload LoginPayload
		jsonDecoder := json.NewDecoder(r.Body)
		err := jsonDecoder.Decode(&loginPayload)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		myauth, err := htpasswd.New(path.Join(dataPath, "htpasswd"), htpasswd.DefaultSystems, nil)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		if !myauth.Match(loginPayload.Username, loginPayload.Password) {
			http.Error(w, "Wrong username or passoword!", http.StatusUnauthorized)
			return
		}

		token := jwt.New(jwt.SigningMethodHS256)
		claims := token.Claims.(jwt.MapClaims)

		claims["admin"] = true
		claims["name"] = loginPayload.Username
		claims["exp"] = time.Now().Add(time.Hour * 24).Unix()

		tokenString, err := token.SignedString(signKey)
		if err != nil {
			fmt.Println(err.Error())
		}

		w.WriteHeader(http.StatusOK)
		w.Header().Set("Content-Type", "application/json")
		w.Write([]byte(tokenString))
	})
}

// JwtMiddleware for token validation
var JwtMiddleware = jwtmiddleware.New(jwtmiddleware.Options{
	ValidationKeyGetter: func(token *jwt.Token) (interface{}, error) {
		return signKey, nil
	},
	SigningMethod: jwt.SigningMethodHS256,
})

// LoginPayload will contain the login info posted to the handler
type LoginPayload struct {
	Username string `json:"username"`
	Password string `json:"password"`
}
