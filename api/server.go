package api

import (
	"fmt"
	"net/http"
	"os"
	"os/signal"
	"syscall"

	"github.com/alfonsocatanzaro/go-wol-esx/auth"
	"github.com/alfonsocatanzaro/go-wol-esx/cmd"
	"github.com/alfonsocatanzaro/go-wol-esx/utils"
	"github.com/gorilla/handlers"
)

// TODO api for new computer
// TODO api for edit computer
// TODO implement data persist
// TODO api for wol a pc
// TODO api for start/stop/pause VMs (we'll use these commands: [vim-cmd vmsvc/getallvms] [vim-cmd vmsvc/power.getstate <ID>])
// TODO api for shutdown esx host
// TODO view model for mail page
// TODO model for add/edit computer
// TODO api for getting status of pcs
// TODO component for ping
// TODO component for manage esxi host

func StartServer(config cmd.Config) <-chan int {
	// setup request handlers
	mux := http.NewServeMux()
	mux.Handle("/", http.FileServer(http.Dir("./ui/build/")))
	mux.Handle("/api/test", auth.JwtMiddleware.Handler(HelloWorldHandler(config.Path)))
	mux.Handle("/api/computers", auth.JwtMiddleware.Handler(ComputersHandler()))
	if config.Debug {
		mux.Handle("/api/login", auth.DebugLoginHandler(config.Path))
	} else {
		mux.Handle("/api/login", auth.LoginHandler(config.Path))

	}

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

	stopServerReasonCh := make(chan int, 1)

	// wait for stop or error signal from one respective channel
	select {
	case <-stop:
		fmt.Println("\nShutting down...")
		stopServerReasonCh <- 0
	case err := <-errs:
		fmt.Println("Failed to start server: ", err.Error())
		stopServerReasonCh <- 1
	}

	return stopServerReasonCh
}
