package models

// Computer contains computer data
type Computer struct {
	ID                 int     `json:"id"`
	Name               string  `json:"name"`
	Mac                string  `json:"mac"`
	IPAddress          string  `json:"ip"`
	BroadcastIPAddress string  `json:"broadcast"`
	SSHEnabled         bool    `json:"sshEnabled"`
	SSH                SSHInfo `json:"sshInfo"`
	ESXEnabled         bool    `json:"esxEnabled"`
	Esx                ESXInfo `json:"esxInfo"`
}

// SSHInfo contains ssh access info
type SSHInfo struct {
	Username     string `json:"username"`
	Password     string `json:"password"`
	UsePublicKey bool   `json:"usePublicKey"`
	PublicKey    string `json:"publicKey"`
}

// ESXInfo contains esx cached info
type ESXInfo struct {
	VMs []EsxVM `json:"vms"`
}

// EsxVM contains virtual host status
type EsxVM struct {
	ID     int    `json:"id"`
	Name   string `json:"name"`
}

