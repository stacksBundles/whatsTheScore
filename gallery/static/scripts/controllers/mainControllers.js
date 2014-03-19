var controllers = angular.module('ScaffoldsApp.controllers', []);

// Main Controller makes the call to the queryService to retrieve game data
// Returned data is passed to the controller scope
controllers.controller('mainCtrl', function ($scope, queryService, $http, filterService, games, loadone, $rootScope) {

	// $scope.$on('mobile', function() {
	// 	$location.path('/mobile');
	// });

	// hides the teambox directives until data has been fetched
	$scope.display = false;
	$scope.default = true;

	loadone.data.objects[0].home_team_stats.team_name = loadone.data.objects[0].home_team.name;
	loadone.data.objects[0].home_team_stats.city_name = loadone.data.objects[0].home_team.city;
	loadone.data.objects[0].home_team_stats.score = loadone.data.objects[0].home_total_score;
	loadone.data.objects[0].away_team_stats.team_name = loadone.data.objects[0].away_team.name;
	loadone.data.objects[0].away_team_stats.city_name = loadone.data.objects[0].away_team.city;
	loadone.data.objects[0].away_team_stats.score = loadone.data.objects[0].away_total_score;

	$scope.loaded = [loadone.data.objects[0].home_team_stats, loadone.data.objects[0].away_team_stats];
	$scope.linescore = loadone.data.objects[0].line_score;
	$scope.scores = loadone.data.objects[0].scoring_plays;

	$scope.weekList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];

	$scope.games = games;

	console.log(loadone);

	$scope.display = true;
	$scope.default = false;
	console.log($scope.loaded);
	$rootScope.$broadcast('ready');

	$scope.loadgame = function(code) {
		console.log('setting queryService.value = ' + code.toString())
		queryService.getGame(code)
		.success( function (response) {
			response.objects[0].home_team_stats.team_name = response.objects[0].home_team.name;
			response.objects[0].home_team_stats.city_name = response.objects[0].home_team.city;
			response.objects[0].home_team_stats.score = response.objects[0].home_total_score;
			response.objects[0].away_team_stats.team_name = response.objects[0].away_team.name;
			response.objects[0].away_team_stats.city_name = response.objects[0].away_team.city;
			response.objects[0].away_team_stats.score = response.objects[0].away_total_score;
			$scope.loaded = [response.objects[0].home_team_stats, response.objects[0].away_team_stats];
			$scope.linescore = response.objects[0].line_score;
			$scope.scores = response.objects[0].scoring_plays;
			$scope.display = true;
			$scope.default = false;
			console.log($scope.scores);
			$rootScope.$broadcast('ready');
		})
	}

	$scope.state = 1;

	$scope.cycle = function() {
		$scope.state = ($scope.state == 3) ? 1 : ($scope.state + 1);
	}
	
	$scope.$on('hide', function() {
		$scope.display = false;
		$scope.default = true;
	})

	

	// $scope.tester = false;
	
	// listens for rootScope broadcast announcing data has been fetched
	// $scope.$on('fetched', function() {
	// 	console.log('fetching...')
	// 	$scope.display = true;
	// 	$scope.default = false;
	// 	$scope.loaded = queryService.returned;
	// 	if ($scope.loaded) {
	// 		console.log('testing...')
	// 		$rootScope.$broadcast('test');
	// 		$timeout(function() {
	// 			$scope.tester = true;
	// 			console.log('testing...')
	// 			$rootScope.$broadcast('test');
	// 		}, 1000);
	// 	};
	// })

	$scope.currentWeek = 1;

	$scope.week = $scope.games[$scope.currentWeek];
	
	$scope.$on('changeWeek', function() {
		$scope.currentWeek = filterService.value;
		$scope.week = $scope.games[$scope.currentWeek];
	})
	

})

// controllers.controller('mobileCtrl', function ($scope, $http, filterService, queryService, games) {
// 	$scope.display = false;
// 	$scope.default = true;
// 	$scope.select = true;

// 	$scope.loaded = {};

// 	$scope.games = games;

// 	$scope.weekList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];

// 	$scope.$on('hide', function() {
// 		$scope.display = false;
// 		$scope.default = true;
// 	})
	
// 	// listens for rootScope broadcast announcing data has been fetched
// 	$scope.$on('fetched', function() {
// 		$scope.loaded = queryService.returned;
// 		$scope.display = true;
// 		$scope.default = false;
// 		$scope.select = false;
// 		$scope.displayHome = true;
// 	})

// 	$scope.currentWeek = 1;

// 	$scope.week = $scope.games[$scope.currentWeek];
	
// 	$scope.$on('changeWeek', function() {
// 		$scope.currentWeek = filterService.value;
// 		$scope.week = $scope.games[$scope.currentWeek];
// 	})

// 	$scope.back = function () {
// 		$scope.select = true;
// 	}
// })
