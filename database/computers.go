package database

import (
	"database/sql"
	_ "github.com/mattn/go-sqlite3"
	"os"
)

var database *sql.DB

// Open or create database and return database object
func Open(filename string) error {
	// check if file exist
	_, err := os.Stat(filename)
	if os.IsNotExist(err) {
		err = create(filename)
	} else {
		err = open(filename)
	}
	if err != nil {
		return err
	}
	return nil

}

func create(filename string) error {
	// create file
	file, err := os.Create(filename) // Create SQLite file
	if err != nil {
		return err
	}
	file.Close()

	err = open(filename)
	if err != nil {
		return err
	}

	err = createTables()
	if err != nil {
		return err
	}

	err = insertSampleData()
	if err != nil {
		return err
	}
	return nil

}

func createTables() error {
	err := createComputersTable()
	if err != nil {
		return err
	}

	err = createVMClientsTable()
	if err != nil {
		return err
	}

	return nil
}

func createComputersTable() error {
	err := execSQLStatement(
		`CREATE TABLE Computers (
			"ID" integer NOT NULL PRIMARY KEY AUTOINCREMENT,		
			"name" TEXT,
			"Mac" TEXT,
			"IPAddress" TEXT,
			"BroadcastIPAddress" TEXT,
			"SSHEnabled" integer,
			"SSHUsername" text,
			"SSHPassword" text,
			"SSHUsePublicKey" integer,
			"SSHPublicKey" text,
			"ESXEnabled" integer
	  	);`)
	return err
}

func createVMClientsTable() error {
	err := execSQLStatement(`
		CREATE TABLE VmClients (
			"ID" integer NOT NULL PRIMARY KEY AUTOINCREMENT,		
			"HostId" integer,
			"VmId" integer,
			"VmName" TEXT
		);`)
	return err
}

func insertSampleData() error {
	for i := 0; i < len(sampleDataStatements); i++ {
		err := execSQLStatement(sampleDataStatements[i])
		if err != nil {
			return err
		}
	}
	return nil
}

func execSQLStatement(sqlStatement string) error {
	statement, err := database.Prepare(sqlStatement)
	if err != nil {
		return err
	}
	_, err = statement.Exec()
	if err != nil {
		return err
	}

	return nil
}

func open(filename string) error {
	var err error
	database, err = sql.Open("sqlite3", filename)
	return err
}

var sampleDataStatements = []string{
	`INSERT INTO Computers (
			name, Mac, IPAddress, BroadcastIPAddress,
			SSHEnabled, SSHUsername, SSHPassword, SSHUsePublicKey, 
			SSHPublicKey,ESXEnabled
		) Values (
			'Computer1', 'AA:BB:CC:DD:EE:FF','192.168.1.4', '192.168.1.255', 1, '', '', 1, '', 1
	);`,
	`INSERT INTO Computers (
			name, Mac, IPAddress, BroadcastIPAddress,
			SSHEnabled, SSHUsername, SSHPassword, SSHUsePublicKey, 
			SSHPublicKey,ESXEnabled
		) Values (
			'Computer2', 'AA:BB:CC:DD:EE:FF', '192.168.1.5', '192.168.1.255', 1, '', '', 1, '', 1
	);`,
	`INSERT INTO Computers (
			name, Mac, IPAddress, BroadcastIPAddress,
			SSHEnabled, SSHUsername, SSHPassword, SSHUsePublicKey, 
			SSHPublicKey,ESXEnabled
		) Values (
			'Computer3', 'AA:BB:CC:DD:EE:FF', '192.168.1.5', '192.168.1.255', 1, '', '', 1, '', 1
	);`,
	`INSERT INTO VmClients (HostId, VmId,VmName) Values (1,1,'VirtualMachine1');`,
	`INSERT INTO VmClients (HostId, VmId,VmName) Values (1,2,'VirtualMachine2');`,
	`INSERT INTO VmClients (HostId, VmId,VmName) Values (2,3,'VirtualMachine3');`,
	`INSERT INTO VmClients (HostId, VmId,VmName) Values (2,4,'VirtualMachine4');`,
	`INSERT INTO VmClients (HostId, VmId,VmName) Values (3,5,'VirtualMachine5');`,
	`INSERT INTO VmClients (HostId, VmId,VmName) Values (3,6,'VirtualMachine6');`,
	}
