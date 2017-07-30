BUILD = build
DATA = data
SRC = src
EREPTILE_BUCKET = gs://www.ereptiledestruction.com

build: fe, publish

deploy:
	gsutil rsync -R $(BUILD) $(EREPTILE_BUCKET)

clean:
	rm -rf $(BUILD)/*

config:
	gsutil web set -m index.html -e 404.html $(EREPTILE_BUCKET)

fe:
	npm run build

publish:
	npm run publish

start:
	npm run start
