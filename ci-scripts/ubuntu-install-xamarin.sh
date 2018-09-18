sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys 3FA7E0328081BFF6A14DA29AA6A19B38D3D831EF
sudo apt install apt-transport-https
echo "deb https://download.mono-project.com/repo/ubuntu stable-trusty main" | sudo tee /etc/apt/sources.list.d/mono-official-stable.list
sudo apt update
sudo apt-get install mono-complete libzip4
wget https://jenkins.mono-project.com/view/Xamarin.Android/job/xamarin-android-linux/993/Azure/processDownloadRequest/xamarin-android/xamarin.android-oss_8.3.99.189_amd64.deb
sudo dpkg -i xamarin.android-oss_8.3.99.189_amd64.deb