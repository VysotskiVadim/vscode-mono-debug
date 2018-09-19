curl -L https://raw.github.com/embarkmobile/android-sdk-installer/version-2/android-sdk-installer | bash /dev/stdin --install=$ANDROID_COMPONENTS --accept=$ANDROID_LICENSES
source ~/.android-sdk-installer/env --dir=$HOME/.android-sdk-installer
export ANDROID_SDK_ROOT=~/.android-sdk-installer
#data for troubleshooting 
#android list target
#android list sdk --extended -a
ls -la $ANDROID_SDK_ROOT
ls -la $ANDROID_SDK_ROOT/system-images/android-24
ls -la $ANDROID_SDK_ROOT/system-images/android-24/default
ls -la $ANDROID_SDK_ROOT/system-images/android-24/default/armeabi-v7a