NODE := node

default: prepare development

base:
	$(NODE) node_modules/.bin/browserify -t babelify -o build/bundle.js src/main.js

minify:
	$(NODE) node_modules/.bin/uglifyjs -o build/bundle.min.js build/bundle.js -m

compiler:
	mkdir build/compiler | true
	$(NODE) node_modules/.bin/babel -d build/compiler src/compiler

prepare:
	mkdir build | true

development:
	make base
	make compiler

production:
	NODE_ENV=production make base
	NODE_ENV=production make minify
	NODE_ENV=production make compiler
