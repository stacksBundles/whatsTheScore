var controllers = angular.module('ScaffoldsApp.controllers', []);

// Main Controller makes the call to the queryService to retrieve game data
// Returned data is passed to the controller scope
controllers.controller('MainCtrl', function($scope, queryService, $http) {

	// hides the teambox directives until data has been fetched
	$scope.display = false;

	$scope.loaded = {};

	// WaPo Sports API is poorly documented so unfortunately the game codes had
	// to be hard-coded. The game codes are of the format YYYYMMDDxxx, where the
	// value of xxx isn't explained and isn't intuitive. 
	$scope.games = [
		{
			HOME: 'KC',
			AWAY: 'IND',
			CODE: 20131222012
		},
		{
			HOME: 'BUF',
			AWAY: 'MIA',
			CODE: 20131222002
		},
		{
			HOME: 'CAR',
			AWAY: 'NO',
			CODE: 20131222029
		},
		{
			HOME: 'NYJ',
			AWAY: 'CLE',
			CODE: 20131222020
		},
		{
			HOME: 'STL',
			AWAY: 'TB',
			CODE: 20131222014
		},
		{
			HOME: 'WAS',
			AWAY: 'DAL',
			CODE: 20131222028
		},
		{
			HOME: 'JAX',
			AWAY: 'TEN',
			CODE: 20131222030
		},
		{
			HOME: 'CIN',
			AWAY: 'MIN',
			CODE: 20131222004
		},
		{
			HOME: 'SF',
			AWAY: 'TB',
			CODE: 20131215027
		},
		{
			HOME: 'NE',
			AWAY: 'MIA',
			CODE: 20131215015
		},
		{
			HOME: 'CHI',
			AWAY: 'CLE',
			CODE: 20131215005
		},
		{
			HOME: 'BUF',
			AWAY: 'JAX',
			CODE: 20131215030
		},
		{
			HOME: 'PHI',
			AWAY: 'MIN',
			CODE: 20131215016
		},
		{
			HOME: 'WAS',
			AWAY: 'ATL',
			CODE: 20131215001
		},
		{
			HOME: 'SEA',
			AWAY: 'NYG',
			CODE: 20131215019
		},
		{
			HOME: 'SD',
			AWAY: 'DEN',
			CODE: 20131212007
		}];
	

		// listens for rootScope broadcast announcing data has been fetched
		$scope.$on('fetched', function() {
			$scope.loaded = queryService.returned;
			$scope.display = true;
		})
	

	

})
