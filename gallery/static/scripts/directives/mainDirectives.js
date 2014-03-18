var directives = angular.module('ScaffoldsApp.directives', []);

// // A stub directive is instantiated for each sidebar game. The linking function
// // calls the queryService with the appropriate game code
// directives.directive('stub', function(queryService, filterService) {
// 	return {
// 		restrict: 'E',
// 		link: function(scope, elem, attrs) {

// 			scope.loadgame = function(code) {
// 				queryService.getGame(code);
// 			};

// 		}
// 	}
// })

// teambox directives use an isolated scope to prevent them from changing each other's
// variables.  The linking function controls the display logic.


directives.directive('teambox', function(queryService, $rootScope, $timeout) {
	return {
		restrict: 'EA',
		scope: {
			test: '=passed'
		},
		templateUrl: 'teambox.html',
		controller: function ($scope) {
			$scope.teambox = {
				output: 'off'
			};

			$scope.switch = {
				sub: function (type) {
					console.log($scope.teambox.output)
					$scope.teambox.output = type.toString();
				}
			}; 
		},
		link: function(scope, elem, attrs) {

			

			

			// a little CSS animation to keep things stylish
			// scope.$on('hide', function() {
			// 	elem.addClass('fadeOut');
			// });

			// scope.$on('show', function() {
			// 	elem.removeClass('fadeOut');
			// 	scope.output = 'off';
			// });
		}
	}
})

directives.directive('weekpicker', function(filterService) {
	return {
		restrict: 'E',
		link: function (scope, elem, attrs) {
			scope.changeWeek = function(week) {
				filterService.set(week);
				elem.addClass('picked');
			}
			scope.$on('clearButtons', function() {
				elem.removeClass('picked');
			})
		}
	}
})

directives.directive('logo', function() {
	return {
		restrict: 'E',
		link: function(scope, elem, attrs) {
			scope.$on('hide', function() {
				elem.addClass('flicker');
			});
			scope.$on('fetched', function() {
				elem.removeClass('flicker');
			})
		}
	}
})

directives.directive('barchart', function() {
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'barchart.html',
		controller: function($scope) {
			$scope.switchchart = function() {
				$scope.chart = ($scope.chart == 1) ? 2 : 1;
			};
		},
		link: function (scope, elem, attrs) {
			scope.bar = {
				wh: 105,
				ht: 180,
				graph: {
					height: 550,
					width: 400
				}
			};
			scope.chart = 1;
			scope.$on('ready', function() {
				console.log('loading SVG ...');
				scope.bar.normHeight = (scope.loaded[0].total_net_yards > scope.loaded[1].total_net_yards) ? scope.loaded[0].total_net_yards : scope.loaded[1].total_net_yards;
				scope.position = 'middle';
				scope.barone = {
					bottom: (scope.loaded[0].rushing_yards / scope.bar.normHeight * scope.bar.ht),
					top: (scope.loaded[0].passing_net_yards / scope.bar.normHeight * scope.bar.ht),
				};
				scope.barone.spacer = (scope.bar.ht - scope.barone.top - scope.barone.bottom);
				scope.bartwo = {
					bottom: (scope.loaded[1].rushing_yards / scope.bar.normHeight * scope.bar.ht),
					top: (scope.loaded[1].passing_net_yards / scope.bar.normHeight * scope.bar.ht),
				};
				scope.bartwo.spacer = (scope.bar.ht - scope.bartwo.top - scope.bartwo.bottom);
				scope.offset = {
					two: (scope.bartwo.bottom + scope.bartwo.spacer),
					one: (scope.barone.bottom + scope.barone.spacer)
				}
				console.log(scope.bartwo.bottom, scope.bartwo.spacer, scope.offset.two);
				console.log(scope.barone.bottom, scope.barone.spacer, scope.offset.one);
			})
			
				
		}
	}
})

directives.directive('timeline', function() {
	return {
		restrict: 'EA',
		replace: true,
		templateUrl: 'timeline.html',
		controller: function($scope) {
			

		},
		link: function (scope, elem, attrs) {
			scope.graph = {
				width: 400,
				height: 350
			};
			scope.datasetA = [];
			scope.datasetB = [];
			scope.lineA = '';
			scope.lineB = '';
			scope.l_x = scope.linescore.away_team.length;
			scope.d_x = (scope.graph.width - 20) / scope.l_x;
			scope.y_norm = (scope.linescore.away_team[3].running_score > scope.linescore.home_team[3].running_score) ? scope.linescore.away_team[3].running_score : scope.linescore.home_team[3].running_score;
			scope.lineA.slice(0, -1);
			scope.lineB.slice(0, -1);
			console.log(scope.lineA);
			console.log(scope.lineB);
			console.log(scope.datasetA);
			console.log(scope.datasetB);

			scope.$on('ready', function() {
				console.log('detected newVal');
				scope.datasetA = [];
				scope.datasetB = [];
				scope.lineA = '';
				scope.lineB = '';
				scope.l_x = scope.linescore.away_team.length;
				scope.d_x = (scope.graph.width - 20) / scope.l_x;
				scope.y_norm = (scope.linescore.away_team[3].running_score > scope.linescore.home_team[3].running_score) ? scope.linescore.away_team[3].running_score : scope.linescore.home_team[3].running_score;

				for (i = 0; i < scope.l_x; i++) {
					scope.datasetA.push({x : (i + 1) * scope.d_x, y : scope.graph.height - ((scope.linescore.away_team[i].running_score / scope.y_norm) * scope.graph.height)});
					scope.lineA = scope.lineA + ((i + 1) * scope.d_x) + ' ' + (scope.graph.height - (scope.linescore.away_team[i].running_score / scope.y_norm * scope.graph.height)) + ','
				};
				for (i = 0; i < scope.l_x; i++) {
					scope.datasetB.push({x : (i + 1) * scope.d_x, y : scope.graph.height - ((scope.linescore.home_team[i].running_score / scope.y_norm) * scope.graph.height)});
					scope.lineB = scope.lineB + ((i + 1) * scope.d_x) + ' ' + (scope.graph.height - (scope.linescore.home_team[i].running_score / scope.y_norm * scope.graph.height)) + ','
				};
				scope.lineA.slice(0, -1);
				scope.lineB.slice(0, -1);
				console.log(scope.lineA);
				console.log(scope.lineB);
			})			
		}
	}
})