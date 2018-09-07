rm proxy_log
tee -a proxy_log <&0 | mono ./bin/Debug/mono-debug.exe | tee -a proxy_log