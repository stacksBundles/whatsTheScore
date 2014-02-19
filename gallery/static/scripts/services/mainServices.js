var services = angular.module('ScaffoldsApp.services', []);

services.factory('filterService', function($rootScope) {
	var filterService = {};

	filterService.value = 1;

	filterService.set = function (week) {
		filterService.value = week;
		$rootScope.$broadcast('changeWeek');
	}

	return filterService;
})


// queryService factory builds the URI and makes the GET call. Returned data is
// loaded using the callback() function and then a rootScope broadcast is made
services.factory('queryService', function($rootScope, $http) {

	var API_URI = 'http://apps.washingtonpost.com/sports/api/nfl/v2/games/?format=jsonp&game_code=';

	var queryService = {
		returned: {},
		cached: {}
	};

	queryService.getGame = function(code) {

		// first check the cache
		if (queryService.cached[code] != null) {
			$rootScope.$broadcast('hide');
			queryService.returned = queryService.cached[code];
			$rootScope.$broadcast('fetched');
			$rootScope.$broadcast('show');
		}
		// if not in the cache then we fetch the data
		else {
			var builtURI = API_URI + code;

			$rootScope.$broadcast('hide');

			// using jsonp to circumvent HTTP Access Control rejections
			$http.jsonp(builtURI);
		
			// functon needs to be defined on the window scope
			window.callback = function(data) {
				queryService.returned = data.objects[0];
				console.log(data.objects[0]);
				queryService.cached[code] = data.objects[0];
				$rootScope.$broadcast('fetched');
			}

			$rootScope.$broadcast('show');
		}

		
	}

	queryService.reap = function() {
		$http.jsonp('http://apps.washingtonpost.com/sports/api/nfl/v2/games/?format=jsonp');

		window.callback = function(data) {
			queryService.returned = data.objects[0];
		}
	}

	return queryService;
})