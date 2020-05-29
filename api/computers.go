package api

import (
	"encoding/json"
	"math/rand"
	"net/http"

	"github.com/alfonsocatanzaro/go-wol-esx/models"
)

type computerViewModel struct {
	ID        int
	Name      string
	IPAddress string
	Status    string
	Child     []childComputerViewModel
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
				ID:        c.ID,
				Name:      c.Name,
				IPAddress: c.IPAddress,
				Status:    getRandomStatus([]string{"ONLINE", "OFFLINE", "UNKNOWN"}),
				Child:     make([]childComputerViewModel, 0),
			}

			if c.ESXEnabled {
				for _, v := range c.Esx.VMs {
					child := childComputerViewModel{
						ID:     v.ID,
						Name:   v.Name,
						Status: getRandomStatus([]string{"ONLINE", "OFFLINE", "SUSPENDED", "UNKNOWN"}),
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
		ID:                 1,
		Name:               "ESX00",
		IPAddress:          "192.168.1.4",
		BroadcastIPAddress: "255.255.255.0",
		Mac:                "AA-BB-CC-DD-EE-FF",
		ESXEnabled:         true,
		Esx: models.ESXInfo{
			VMs: []models.EsxVM{
				{
					ID:     5,
					Name:   "UBUNTU",
					Status: "on",
				}, {
					ID:     8,
					Name:   "NODE80",
					Status: "off",
				},
			},
		},
	},
	{
		ID:                 2,
		Name:               "ESX01",
		IPAddress:          "192.168.1.5",
		BroadcastIPAddress: "255.255.255.0",
		Mac:                "FF-EE-DD-CC-BB-AA",
		ESXEnabled:         true,
		Esx: models.ESXInfo{
			VMs: []models.EsxVM{
				{
					ID:     8,
					Name:   "Windows10",
					Status: "on",
				}, {
					ID:     9,
					Name:   "Raspbian",
					Status: "off",
				},
				{
					ID:     3,
					Name:   "NONE90",
					Status: "on",
				},
			},
		},
	},
}
