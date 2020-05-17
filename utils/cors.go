package utils

import (
	"fmt"
	"net/http"
)

// CorsHandler set cost headers
func CorsHandler(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		origin := r.Header.Get("Origin")
		fmt.Println(origin)
		if origin == "http://localhost:3000" ||
			origin == "http://localhost:3001" {
			w.Header().Set("Access-Control-Allow-Origin", origin)
			w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
			w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
		} else {
			w.Header().Del("Access-Control-Allow-Origin")
			w.Header().Del("Access-Control-Allow-Methods")
			w.Header().Del("Access-Control-Allow-Headers")
		}

		next.ServeHTTP(w, r)
	})
}
