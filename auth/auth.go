package auth

import (
	"encoding/json"
	"fmt"
	"net/http"
	"path"
	"time"

	jwtmiddleware "github.com/auth0/go-jwt-middleware"
	"github.com/dgrijalva/jwt-go"
	"github.com/tg123/go-htpasswd"
)

var signKey = []byte("HSKJAHSKJ(/&JHBSDAKJHD")

// LoginHandler Validate username and password and return jwt token
func LoginHandler(dataPath string) http.HandlerFunc {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if !verbIsAllowed(w, r, http.MethodPost) {
			return
		}

		var loginPayload LoginPayload
		if err := loginPayload.decode(w, r); err != nil {
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

		err = writeAuthToken(w, loginPayload.Username)
		if err != nil {
			fmt.Println(err.Error())
		}
	})
}

// LoginHandler debug method for validate useraname and password
// username: admin
// password: admin
// and return jwt token
func DebugLoginHandler(dataPath string) http.HandlerFunc {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if !verbIsAllowed(w, r, http.MethodPost) {
			return
		}

		var loginPayload LoginPayload
		if err := loginPayload.decode(w, r); err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		if !(loginPayload.Username == "admin" && loginPayload.Password == "admin") {
			http.Error(w, "Wrong username or passoword!", http.StatusUnauthorized)
			return
		}

		err := writeAuthToken(w, loginPayload.Username)
		if err != nil {
			fmt.Println(err.Error())
		}
	})
}

func writeAuthToken(w http.ResponseWriter, username string) error {
	token := jwt.New(jwt.SigningMethodHS256)
	claims := token.Claims.(jwt.MapClaims)

	claims["admin"] = true
	claims["name"] = username
	claims["exp"] = time.Now().Add(time.Hour * 24).Unix()

	tokenString, err := token.SignedString(signKey)

	w.WriteHeader(http.StatusOK)
	w.Header().Set("Content-Type", "application/json")
	w.Write([]byte(tokenString))
	return err
}

func verbIsAllowed(w http.ResponseWriter, r *http.Request, method string) bool {
	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusOK)
		return false
	}
	if r.Method != method {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return false
	}
	return true
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

func (loginPayload *LoginPayload) decode(w http.ResponseWriter, r *http.Request) error {
	jsonDecoder := json.NewDecoder(r.Body)
	err := jsonDecoder.Decode(loginPayload)
	return err
}
