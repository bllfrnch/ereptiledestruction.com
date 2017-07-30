BUILD = build
DATA = data
SRC = src

build: fe, publish

deploy: build
	gsutil rsync -R $(BUILD) gs://www.ereptiledestuction.com

clean:
	rm -rf $(BUILD)/*

fe:
	npm run build

publish:
	npm run publish

start:
	npm run start
