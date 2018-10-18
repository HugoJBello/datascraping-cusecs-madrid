#!/bin/bash
PATH=/opt/someApp/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
if [[ ! $(pgrep -f scraper_idealista_seccion_censal.ts) ]];
	then
		ts-node scraper_idealista_seccion_censal.ts > bash.log
		nano scraper_idealista_seccion_censal.ts &
		sleep 30m
		killall nano
	else
		echo already running > bash.log
fi
