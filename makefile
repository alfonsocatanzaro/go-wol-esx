init:
	cd ui && npm run build

build: init
	go build -o bin/go-wol-esx cmd/main.go

run: build
	bin/go-wol-esx

