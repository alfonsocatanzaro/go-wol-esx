package cmd

import (
	"os"
	"path/filepath"

	kingpin "gopkg.in/alecthomas/kingpin.v2"
)

//args container struct
type Config struct {
	Port  int32
	Debug bool
	Path  string
}

func ParseCLI(version string) (*Config, error) {
	config := Config{}

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
		return nil, err
	}
	return &config, nil
}

func (config *Config) CreateDataPathIfNotExists() error {
	var err error
	if _, err = os.Stat(config.Path); os.IsNotExist(err) {
		err = os.MkdirAll(config.Path, os.ModePerm)
	}
	return err
}
