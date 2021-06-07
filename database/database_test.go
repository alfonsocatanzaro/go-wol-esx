package database

import (
	"os"
	"testing"

	"github.com/alfonsocatanzaro/go-wol-esx/models"
)

const testDbFileName = "../data/test.db"

func TestDatabase(t *testing.T) {

	initdb(t)
	add(t)
	update(t)
	deletebyid(t)
	cleanup(t)
}

func cleanup(t *testing.T) {
	if _, err := os.Stat(testDbFileName); err == nil {
		if err := os.Remove(testDbFileName); err != nil {
			t.Fatal(err)
		}
	}
}

func initdb(t *testing.T) {
	if err := InitDb(testDbFileName); err != nil {
		t.Fatal(err)
	}
}

func add(t *testing.T) {
	Save(&models.Computer{
		Name:               "ESX00",
		Mac:                "00:00:00:00:00",
		IPAddress:          "192.168.1.4",
		BroadcastIPAddress: "255.255.255.0",
		SSHEnabled:         true,
		SSH: models.SSHInfo{
			UsePublicKey: true,
			PublicKey:    "kdsjfhdksjhfkdsjfhkdsjfhkjds",
		},
		ESXEnabled: true,
		Esx: models.ESXInfo{
			VMs: []models.EsxVM{
				{
					ID:   1,
					Name: "aaa",
				},
				{
					ID:   2,
					Name: "bbb",
				},
			},
		},
	})

	all, err := GetAll()
	if err != nil {
		t.Fatal(err)
	}

	if len(all) != 1 {
		t.Fatalf("add failed, wnat 1 got %v", len(all))
	}
}
func update(t *testing.T) {
	var c models.Computer

	if all, err := GetAll(); err != nil {
		t.Fatal(err)
	} else {
		c = all[0]
	}

	c.Name = "CHANGED"
	if err := Save(&c); err != nil {
		t.Fatal(err)
	}

	if all, err := GetAll(); err != nil {
		t.Fatal(err)
	} else {
		c = all[0]
		if c.Name != "CHANGED" {
			t.Fatalf("update failed, want 'CHANGED' got %v", c.Name)
		}
	}
}

func deletebyid(t *testing.T) {
	var c models.Computer

	if all, err := GetAll(); err != nil {
		t.Fatal(err)
	} else {
		c = all[0]
	}

	if err := DeleteByID(c.ID); err != nil {
		t.Fatal(err)
	}

	all, err := GetAll()
	if err != nil {
		t.Fatal(err)
	}

	if len(all) != 0 {
		t.Fatalf("add failed, wnat 0 got %v", len(all))
	}

}
