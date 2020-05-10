package main

import (
	"fmt"
	"net/http"
	"os"
	"os/signal"
	"path/filepath"
	"syscall"

	"github.com/alfonsocatanzaro/go-wol-esx/api"
	"github.com/alfonsocatanzaro/go-wol-esx/auth"
	"github.com/gorilla/handlers"
	kingpin "gopkg.in/alecthomas/kingpin.v2"
)

var version = "1.0.0"

func main() {
	//args container struct
	cfg := struct {
		Port int32
	}{}

	// init args Parser
	kp := kingpin.New(filepath.Base(os.Args[0]), "GO-WOL-ESX server.")
	kp.Version(version)
	kp.Flag("port", "Listen port of the server").
		Default("3000").
		Int32Var(&cfg.Port)

	kp.HelpFlag.Short('h')

	// parse args and show usege if error
	if _, err := kp.Parse(os.Args[1:]); err != nil {
		kp.Usage(os.Args[1:])
		os.Exit(1)
	}
	// setup request handlers
	mux := http.NewServeMux()
	mux.Handle("/api/", auth.JwtMiddleware.Handler(api.HelloWorldHandler))
	mux.Handle("/get-token/", auth.GetAuthToken)
	
	mux.Handle("/", http.FileServer(http.Dir("../ui/build/")))

	// configure http server
	srv := &http.Server{
		Addr:    fmt.Sprintf(":%v", cfg.Port),
		Handler: handlers.LoggingHandler(os.Stdout, mux),
	}

	// create channel for error
	errs := make(chan error, 1)

	// start server and bind error channel to error return of http server  start
	go func() {
		errs <- srv.ListenAndServe()

		fmt.Println("Listen on port:", cfg.Port)
	}()

	// make channel for stop signal
	stop := make(chan os.Signal, 1)
	// bind stop channer to stop signal from os
	signal.Notify(stop, os.Interrupt, syscall.SIGTERM)

	// wait for stop or error signal from one respective channel
	select {
	case <-stop:
		fmt.Println("\nShutting down...")
		os.Exit(0)
	case err := <-errs:
		fmt.Println("Failed to start server: ", err.Error())
		os.Exit(1)
	}

}
