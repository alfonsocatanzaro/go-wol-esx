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
	"github.com/alfonsocatanzaro/go-wol-esx/utils"
	"github.com/gorilla/handlers"

	// "github.com/gorilla/handlers"
	kingpin "gopkg.in/alecthomas/kingpin.v2"
)

var version = "1.0.0"

func main() {
	//args container struct
	config := struct {
		Port  int32
		Debug bool
		Path  string
	}{}

	// init args Parser
	kp := kingpin.New(filepath.Base(os.Args[0]), "GO-WOL-ESX server.")
	kp.Version(version)
	kp.Flag("port", "Listen port of the server").
		Short('p').
		Default("3000").
		Int32Var(&config.Port)

	kp.Flag("path", "Path where store data").
		Short('P').
		Default("./data").
		StringVar(&config.Path)

	kp.Flag("debug", "debug mode on").
		Short('d').
		BoolVar(&config.Debug)

	kp.HelpFlag.Short('h')

	// parse args and show usege if error
	if _, err := kp.Parse(os.Args[1:]); err != nil {
		kp.Usage(os.Args[1:])
		os.Exit(1)
	}

	if _, err := os.Stat(config.Path); os.IsNotExist(err) {
		os.MkdirAll(config.Path, os.ModePerm)
	} else if err != nil {
		panic(err)
	}

	// setup request handlers
	mux := http.NewServeMux()
	mux.Handle("/", http.FileServer(http.Dir("./ui/build/")))
	mux.Handle("/api/test", auth.JwtMiddleware.Handler(api.HelloWorldHandler(config.Path)))
	mux.Handle("/api/computers", auth.JwtMiddleware.Handler(api.ComputersHandler()))
	mux.Handle("/api/login", auth.LoginHandler(config.Path))

	// TODO api for new computer
	// TODO api for edit computer
	// TODO implement database
	// TODO api for wol a pc
	// TODO api for start/stop/pause VMs (we'll use these commands: [vim-cmd vmsvc/getallvms] [vim-cmd vmsvc/power.getstate <ID>])
	// TODO api for shutdown esx host
	// TODO view model for mail page
	// TODO model for add/edit computer
	// TODO api for getting status of pcs
	// TODO component for ping
	// TODO component for manage esxi host

	// configure http server
	var handler http.Handler
	if config.Debug {
		handler = utils.CorsHandler(handlers.LoggingHandler(os.Stdout, mux))
	} else {
		handler = mux
	}

	srv := &http.Server{
		Addr:    fmt.Sprintf(":%v", config.Port),
		Handler: handler,
	}

	// create channel for error
	errs := make(chan error, 1)

	// start server and bind error channel to error return of http server  start
	go func() {
		errs <- srv.ListenAndServe()
		fmt.Println("Listen on port:", config.Port)
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
