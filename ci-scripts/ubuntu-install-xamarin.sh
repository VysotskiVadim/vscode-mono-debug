# install oracle jdk 8
sudo apt-get update
sudo apt-get install -y software-properties-common debconf-utils
sudo add-apt-repository -y ppa:webupd8team/java
sudo apt-get update
sudo echo "oracle-java8-installer shared/accepted-oracle-license-v1-1 select true" | sudo debconf-set-selections
sudo apt-get install -y oracle-java8-installer
sudo apt-get install oracle-java8-set-default
echo "update-java-alternatives -l: "
update-java-alternatives -l
echo "java -version: "
java -version

sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys 3FA7E0328081BFF6A14DA29AA6A19B38D3D831EF
sudo apt install apt-transport-https
echo "deb https://download.mono-project.com/repo/ubuntu stable-xenial main" | sudo tee /etc/apt/sources.list.d/mono-official-stable.list
sudo apt update
sudo apt-get install mono-complete nuget libzip4
wget https://jenkins.mono-project.com/view/Xamarin.Android/job/xamarin-android-linux/993/Azure/processDownloadRequest/xamarin-android/xamarin.android-oss_8.3.99.189_amd64.deb
sudo dpkg -i xamarin.android-oss_8.3.99.189_amd64.deb
