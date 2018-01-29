var app = angular.module('ANews');

app.filter('domain', function() {
	return function(input) {
		var hostname;
		//find & remove protocol (http, ftp, etc.) and get hostname

		if (input.indexOf("://") > -1) {
			hostname = input.split('/')[2];
		}
		else {
			hostname = input.split('/')[0];
		}

		//find & remove port number
		hostname = hostname.split(':')[0];
		//find & remove "?"
		hostname = hostname.split('?')[0];

		return hostname;
	};
});