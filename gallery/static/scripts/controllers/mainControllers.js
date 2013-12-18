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
			HOME: 'BAL',
			AWAY: 'DET',
			CODE: 20131216008
		},
		{
			HOME: 'CIN',
			AWAY: 'PIT',
			CODE: 20131215023
		},
		{
			HOME: 'GB',
			AWAY: 'DAL',
			CODE: 20131215006
		},
		{
			HOME: 'NO',
			AWAY: 'STL',
			CODE: 20131215014
		},
		{
			HOME: 'ARZ',
			AWAY: 'TEN',
			CODE: 20131215010
		},
		{
			HOME: 'KC',
			AWAY: 'OAK',
			CODE: 20131215013
		},
		{
			HOME: 'NYJ',
			AWAY: 'CAR',
			CODE: 20131215029
		},
		{
			HOME: 'HOU',
			AWAY: 'IND',
			CODE: 20131215011
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
