package api

import (
	"encoding/json"
	"net/http"
)

// HelloWorldHandler return http.Handler for demo hello world
var HelloWorldHandler = http.HandlerFunc(func(res http.ResponseWriter, req *http.Request) {
	res.Header().Set("Content-Type", "application/json")

	body, err := json.Marshal(map[string]interface{}{
		"data": "Hello, world",
	})

	if err != nil {
		res.WriteHeader(500)
		return
	}

	res.WriteHeader(200)
	res.Write(body)
})
