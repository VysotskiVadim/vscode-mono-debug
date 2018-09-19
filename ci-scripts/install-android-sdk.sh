curl -L https://raw.github.com/embarkmobile/android-sdk-installer/version-2/android-sdk-installer | bash /dev/stdin --install=$ANDROID_COMPONENTS --accept=$ANDROID_LICENSES
source ~/.android-sdk-installer/env

if [[ "$TRAVIS_OS_NAME" == "osx" ]]
then 
    export ANDROID_SDK_ROOT=~/.android-sdk-installer/android-sdk-macosx
fi
if [[ "$TRAVIS_OS_NAME" == "linux" ]]
then 
    export ANDROID_SDK_ROOT=~/.android-sdk-installer/android-sdk-linux
fi

#data for troubleshooting 
#android list target
#android list sdk --extended -a
ls -la $ANDROID_SDK_ROOT
ls -la $ANDROID_SDK_ROOT/system-images/android-24
ls -la $ANDROID_SDK_ROOT/system-images/android-24/default
ls -la $ANDROID_SDK_ROOT/system-images/android-24/default/armeabi-v7a