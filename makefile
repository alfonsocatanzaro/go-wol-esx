buildui:
	cd ui && npm run build

buildserver: 
	go build -o bin/go-wol-esx cmd/main.go

runall: buildui buildserver
	bin/go-wol-esx

run: buildserver
	bin/go-wol-esx

