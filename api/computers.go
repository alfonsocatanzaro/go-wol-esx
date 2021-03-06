package api

import (
	"encoding/json"
	"math/rand"
	"net/http"

	"github.com/alfonsocatanzaro/go-wol-esx/models"
	"github.com/google/uuid"
)

const onLine = "ONLINE"
const offLine = "OFFLINE"
const paused = "PAUSED"
const stopped = "STOPPED"
const pending = "PENDING"

type computerViewModel struct {
	ID     string
	Name   string
	Status string
	Child  []childComputerViewModel
}

type childComputerViewModel struct {
	ID     int
	Name   string
	Status string
}

// ComputersHandler retun list of computers
func ComputersHandler() http.HandlerFunc {
	return func(res http.ResponseWriter, req *http.Request) {
		res.Header().Set("Content-Type", "application/json")
		computers := make([]computerViewModel, 0)

		//TODO get from database instead
		for _, c := range fakedata {
			vm := computerViewModel{
				ID:     c.ID.String(),
				Name:   c.Name,
				Status: getRandomStatus([]string{onLine, offLine}),
				Child:  make([]childComputerViewModel, 0),
			}

			if c.ESXEnabled {
				for _, v := range c.Esx.VMs {
					child := childComputerViewModel{
						ID:     v.ID,
						Name:   v.Name,
						Status: getRandomStatus([]string{onLine, offLine, stopped, paused, pending}),
					}
					vm.Child = append(vm.Child, child)
				}
			}
			computers = append(computers, vm)
		}

		body, err := json.Marshal(computers)

		if err != nil {
			res.WriteHeader(500)
			return
		}
		res.WriteHeader(http.StatusOK)
		res.Write(body)
	}
}

func getRandomStatus(states []string) string {
	return states[rand.Intn(len(states))]
}

var fakedata = []models.Computer{
	{
		ID:                 uuid.MustParse("7e4dfe78-e4f1-441e-abf7-c6efb0251d94"),
		Name:               "ESX00",
		IPAddress:          "192.168.1.4",
		BroadcastIPAddress: "255.255.255.0",
		Mac:                "AA-BB-CC-DD-EE-FF",
		ESXEnabled:         true,
		Esx: models.ESXInfo{
			VMs: []models.EsxVM{
				{
					ID:   5,
					Name: "UBUNTU",
				}, {
					ID:   8,
					Name: "NODE80",
				},
			},
		},
	},
	{
		ID:                 uuid.MustParse("abca4b50-2364-4558-af62-03cef5520b5c"),
		Name:               "ESX01",
		IPAddress:          "192.168.1.5",
		BroadcastIPAddress: "255.255.255.0",
		Mac:                "FF-EE-DD-CC-BB-AA",
		ESXEnabled:         true,
		Esx: models.ESXInfo{
			VMs: []models.EsxVM{
				{
					ID:   8,
					Name: "Windows10",
				}, {
					ID:   9,
					Name: "Raspbian",
				},
				{
					ID:   3,
					Name: "NONE90",
				},
			},
		},
	},
}
