package main

import (
	"fmt"
	"os"
	"path"

	"github.com/alfonsocatanzaro/go-wol-esx/api"
	"github.com/alfonsocatanzaro/go-wol-esx/cmd"
	"github.com/alfonsocatanzaro/go-wol-esx/database"
)

var version = "1.0.0"

func main() {

	config, err := cmd.ParseCLI(version)
	if err != nil {
		fmt.Println("Error parsing command line args ", err.Error())
		os.Exit(1)
	}

	err = config.CreateDataPathIfNotExists()
	if err != nil {
		fmt.Println("Error while creating data path ", err.Error())
		os.Exit(1)
	}

	err = database.InitDb(path.Join(config.Path, "data.db"))
	if err != nil {
		fmt.Println("Error while init database ", err.Error())
		os.Exit(1)
	}

	exitCode := <-api.StartServer(*config)
	os.Exit(exitCode)

}
