var services = angular.module('ScaffoldsApp.services', []);


// queryService factory builds the URI and makes the GET call. Returned data is
// loaded using the callback() function and then a rootScope broadcast is made
services.factory('queryService', function($rootScope, $http) {

	var API_URI = 'http://apps.washingtonpost.com/sports/api/nfl/v2/games/?format=jsonp&game_code=';

	var queryService = {
		returned: {}
	};

	queryService.getGame = function(code) {

		var builtURI = API_URI + code;

		$rootScope.$broadcast('hide');

		// using jsonp to circumvent HTTP Access Control rejections
		$http.jsonp(builtURI);
		
		// functon needs to be defined on the window scope
		window.callback = function(data) {
			queryService.returned = data.objects[0];
			$rootScope.$broadcast('fetched');
		}

		$rootScope.$broadcast('show');
	}

	return queryService;
})