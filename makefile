# Build ui (react)
buildui:
	cd ui && npm run build

# Build server (go)
buildserver: 
	go build -o bin/go-wol-esx cmd/main.go

# Run all (server and ui) after build both
runall: buildui buildserver
	bin/go-wol-esx -p 3000 -d

# Run (after build) server only
run: buildserver
	bin/go-wol-esx -p 3000 -d

# Run ui on mac/linux
runui:
	cd ui && npm run start

# Run UI on windows dev machine
runuiw:
	cd ui && npm run startw
