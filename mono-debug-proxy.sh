rm proxy_log
tee -a proxy_log <&0 | mono ./bin/Release/xamarin-debug.exe | tee -a proxy_log