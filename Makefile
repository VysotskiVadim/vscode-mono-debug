
MONO_DEBUG_RELEASE = "./bin/Release/mono-debug.exe"
MONO_DEBUG_DEBUG = "./bin/Debug/mono-debug.exe"

all: vsix
	@echo "vsix created"

vsix: $MONO_DEBUG_RELEASE
	./node_modules/.bin/vsce package

publish: $MONO_DEBUG_RELEASE
	./node_modules/.bin/vsce publish

build: $MONO_DEBUG_RELEASE
	node_modules/.bin/tsc -p ./src/typescript
	@echo "build finished"

debug: $MONO_DEBUG_DEBUG
	node_modules/.bin/tsc -p ./src/typescript
	@echo "build finished"

$MONO_DEBUG_RELEASE:
	msbuild /p:Configuration=Release mono-debug.sln

$MONO_DEBUG_DEBUG:
	msbuild /p:Configuration=Debug mono-debug.sln

tests:
	cd testdata/xamarin_android; make

clean:
	git clean -xfd