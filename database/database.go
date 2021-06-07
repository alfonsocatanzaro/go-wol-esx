package database

import (
	"encoding/json"

	"github.com/alfonsocatanzaro/go-wol-esx/models"
	"github.com/boltdb/bolt"
	"github.com/google/uuid"
)

var dbFilePath string

const COMPUTERS_BUCKET = "Computers"

// InitDb creates the db if doesn't exists
func InitDb(dbFile string) error {
	dbFilePath = dbFile
	db, err := bolt.Open(dbFilePath, 0600, nil)
	if err != nil {
		return err
	}
	defer db.Close()
	err = db.Update(func(tx *bolt.Tx) error {
		_, err = tx.CreateBucketIfNotExists([]byte(COMPUTERS_BUCKET))
		return err
	})
	return nil
}

// Save (or update) computer, creates new uuid if needed
func Save(c *models.Computer) error {
	db, err := bolt.Open(dbFilePath, 0600, nil)
	if err != nil {
		return err
	}
	defer db.Close()

	if c.ID == uuid.Nil {
		c.ID = uuid.New()
	}
	data, err := json.Marshal(c)
	if err != nil {
		return err
	}
	err = db.Update(func(tx *bolt.Tx) error {
		b := tx.Bucket([]byte(COMPUTERS_BUCKET))
		bytesId, err := c.ID.MarshalBinary()
		if err != nil {
			return err
		}
		err = b.Put(bytesId, data)
		return err
	})
	return err
}

// GetAll returns a slice with all computers
func GetAll() ([]models.Computer, error) {
	db, err := bolt.Open(dbFilePath, 0600, nil)
	if err != nil {
		return nil, err
	}
	defer db.Close()

	computers := make([]models.Computer, 0)
	db.View(func(tx *bolt.Tx) error {
		b := tx.Bucket([]byte(COMPUTERS_BUCKET))
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

func Delete(c *models.Computer) error {
	return DeleteByID(c.ID)
}

func DeleteByID(id uuid.UUID) error {
	db, err := bolt.Open(dbFilePath, 0600, nil)
	if err != nil {
		return err
	}
	defer db.Close()

	err = db.Update(func(tx *bolt.Tx) error {
		b := tx.Bucket([]byte(COMPUTERS_BUCKET))
		bytesId, err := id.MarshalBinary()
		if err != nil {
			return err
		}
		err = b.Delete(bytesId)
		return err
	})
	return err

}
