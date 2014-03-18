var services = angular.module('ScaffoldsApp.services', []);

services.factory('filterService', function($rootScope) {
	var filterService = {};

	filterService.value = 1;

	filterService.set = function (week) {
		filterService.value = week;
		$rootScope.$broadcast('changeWeek');
		$rootScope.$broadcast('clearButtons');
	}

	return filterService;
})


// queryService factory builds the URI and makes the GET call. Returned data is
// loaded using the callback() function and then a rootScope broadcast is made
services.factory('queryService', function($rootScope, $http, $cacheFactory) {

	var API_URI = 'http://apps.washingtonpost.com/sports/api/nfl/v2/games/?format=jsonp&game_code=';

	var lruCache = $cacheFactory('lruCache', { capacity: 16 });

	var queryService = {

		getGame: function (code) {
			var builtURI = API_URI + code + '&callback=JSON_CALLBACK';
			$rootScope.$broadcast('hide');
			var promise = $http.jsonp(builtURI, {cache: lruCache})
			return promise;
		},

		onload: function() {
			var builtURI = API_URI + 20130905007 + '&callback=JSON_CALLBACK';
			$rootScope.$broadcast('hide');
			var promise = $http.jsonp(builtURI, { cache: lruCache })
			.success( function (response) {
				$rootScope.$broadcast('ready');
				return response
			});
			return promise;
		}

	}

	return queryService;
})