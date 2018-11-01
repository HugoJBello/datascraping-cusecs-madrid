
#!/bin/bash
PATH=/opt/someApp/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
if [[ ! $(pgrep -f scraper_idealista_puppeteer_rp.js) ]]; 
	then
		node scraper_idealista_puppeteer_rp.js > bash.log
		nano scraper_idealista_puppeteer_rp.js &
		sleep 30m
		killall nano
	else
		echo already running > bash.log
fi