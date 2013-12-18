var services = angular.module('ScaffoldsApp.services', []);

services.factory('queryService', function($rootScope, $http) {

	var API_URI = 'http://apps.washingtonpost.com/sports/api/nfl/v2/games/?format=jsonp&game_code=';

	var queryService = {
		returned: {}
	};

	queryService.getGame = function(code) {

		var builtURI = API_URI + code;

		$http.jsonp(builtURI);
		
		window.callback = function(data) {
			console.log(data.objects[0]);
			queryService.returned = data.objects[0];
			console.log('broadcasting fetched');
			$rootScope.$broadcast('fetched');
		}
	}

	return queryService;
})