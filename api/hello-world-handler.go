package api

import (
	"encoding/json"
	"net/http"
)

// HelloWorldHandler return http.Handler for demo hello world
func HelloWorldHandler(dataPath string) http.HandlerFunc {
	return http.HandlerFunc(func(res http.ResponseWriter, req *http.Request) {
		res.Header().Set("Content-Type", "application/json")

		body, err := json.Marshal(map[string]interface{}{
			"data": dataPath,
		})

		if err != nil {
			res.WriteHeader(500)
			return
		}

		res.WriteHeader(http.StatusOK)
		res.Write(body)
	})
}
