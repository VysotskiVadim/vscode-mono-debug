# VS Code Xamarin Debug

A simple VS Code debugger extension for the Xamarin. It's forked [Mono Debug](https://github.com/Microsoft/vscode-mono-debug) with some changes with additions which allows you to debug Xamarin Android. 

# Limitaion

Xamarin Debug supports only debuggin of Xamarin.Android projectes on MacOs or Ubuntu(probaly it should work on other linux distros, but nobody tested it).
Xamarin Android debugging support only one attached device, please make sure that command ```adb devices``` shows only one device in list.

# Debuggin Xamarin Android

In order to debug Xamarin.Android appliction you need to install it on device. Use msbuild target Intstall:
```bash
msbuild droid.csproj /p:Configuration=Debug /t:Install
```

After install setup debugger like in [example](https://github.com/VysotskiVadim/Xamarin.Debug.Example):
```json
{
  "name": "Debug android",
  "type": "xamarin",
  "request": "launch",
  "packageName": "com.xamarin.debugexample.x_a_debug"
}

```

# Building extension

[![Build Status](https://travis-ci.org/VysotskiVadim/vscode-xamarin-debug.svg?branch=master)](https://travis-ci.org/VysotskiVadim/vscode-xamarin-debug)

Building and using VS Code xamarin-debug requires a basic POSIX-like environment, a Bash-like shell, and an installed Mono framework.

To build the extension vsix, run:
```bash
npm install
make
```

