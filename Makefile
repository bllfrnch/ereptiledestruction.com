BUILD = build
DATA = data
SRC = src
EREPTILE_BUCKET = gs://www.ereptiledestruction.com
LOGS_BUCKET = gs://www-ereptiledestruction-com-logs

build: fe, publish

deploy: bundle
	gsutil -m rsync -R $(BUILD) $(EREPTILE_BUCKET)

clean:
	rm -rf $(BUILD)/*

config:
	gsutil web set -m index.html -e 404.html $(EREPTILE_BUCKET)
	gsutil acl ch -g cloud-storage-analytics@google.com:W $(LOGS_BUCKET)
	gsutil logging set on -b $(LOGS_BUCKET) $(EREPTILE_BUCKET)

fe:
	npm run build

bundle:
	npm run bundle

start:
	npm run start

logs:
	gsutil logging get $(EREPTILE_BUCKET)
