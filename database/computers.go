package database

import (
	"encoding/json"
	"fmt"

	"github.com/alfonsocatanzaro/go-wol-esx/models"
	"github.com/boltdb/bolt"
)

const COMPUTERS = "Computers"


var dbFilePath string

func InitDb(dbFile string) error {
	dbFilePath = dbFile
	db, err := bolt.Open(dbFilePath, 0600, nil)
	if err != nil {
		return err
	}
	defer db.Close()
	err = db.Update(func(tx *bolt.Tx) error {
		_, err = tx.CreateBucketIfNotExists([]byte(COMPUTERS))
		return err
	})
	return nil
}

func Save(c *models.Computer) error {
	db, err := bolt.Open(dbFilePath, 0600, nil)
	if err != nil {
		return err
	}
	defer db.Close()
	id := []byte(fmt.Sprint(c.ID))
	data, err := json.Marshal(c)
	if err != nil {
		return err
	}
	err = db.Update(func(tx *bolt.Tx) error {
		b := tx.Bucket([]byte(COMPUTERS))
		err := b.Put(id, data)
		return err
	})
	return err
}

func GetAll() ([]models.Computer, error) {
	db, err := bolt.Open(dbFilePath, 0600, nil)
	if err != nil {
		return nil, err
	}
	defer db.Close()

	computers := make([]models.Computer, 0)
	db.View(func(tx *bolt.Tx) error {
		b := tx.Bucket([]byte(COMPUTERS))
		c := b.Cursor()
		for k, v := c.First(); k != nil; k, v = c.Next() {
			comp := models.Computer{}
			json.Unmarshal(v, &comp)
			computers = append(computers, comp)
		}
		return nil
	})
	return computers, nil
}
