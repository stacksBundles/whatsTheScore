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
				wh: 155,
				ht: 230,
				graph: {
					height: 350,
					width: 352
				}
			};
			scope.chart = 1;
			scope.$on('ready', function() {
				scope.bar.normHeight = (scope.loaded[0].total_net_yards > scope.loaded[1].total_net_yards) ? scope.loaded[0].total_net_yards : scope.loaded[1].total_net_yards;
				scope.position = 'middle';
				scope.barone = {
					bottom: (scope.loaded[0].rushing_yards / scope.bar.normHeight * scope.bar.ht),
					top: (scope.loaded[0].passing_net_yards / scope.bar.normHeight * scope.bar.ht),
				};
				scope.barone.spacer = (scope.bar.ht - scope.barone.top - scope.barone.bottom) + 110;
				scope.bartwo = {
					bottom: (scope.loaded[1].rushing_yards / scope.bar.normHeight * scope.bar.ht),
					top: (scope.loaded[1].passing_net_yards / scope.bar.normHeight * scope.bar.ht),
				};
				scope.bartwo.spacer = (scope.bar.ht - scope.bartwo.top - scope.bartwo.bottom) + 110;
				scope.offset = {
					two: (scope.bartwo.bottom + scope.bartwo.spacer),
					one: (scope.barone.bottom + scope.barone.spacer)
				}
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
				width: 352,
				height: 350
			};
			scope.datasetA = [];
			scope.datasetB = [];
			scope.lineA = '';
			scope.lineB = '';
			scope.l_x = scope.linescore.away_team.length;
			scope.d_x = (scope.graph.width - 10) / scope.l_x;
			scope.y_norm = (scope.linescore.away_team[3].running_score > scope.linescore.home_team[3].running_score) ? scope.linescore.away_team[3].running_score : scope.linescore.home_team[3].running_score;
			scope.lineA.slice(0, -1);
			scope.lineB.slice(0, -1);

			scope.$on('ready', function() {
				console.log('detected newVal');
				scope.datasetA = [];
				scope.datasetB = [];
				scope.lineA = '';
				scope.lineB = '';
				scope.l_x = scope.linescore.away_team.length;
				scope.d_x = (scope.graph.width - 10) / scope.l_x;
				scope.y_norm = (scope.linescore.away_team[3].running_score > scope.linescore.home_team[3].running_score) ? scope.linescore.away_team[3].running_score : scope.linescore.home_team[3].running_score;
				for (i = 0; i < scope.l_x; i++) {
					scope.datasetA.push({x : (i + 0.4) * scope.d_x, y : scope.graph.height - ((scope.linescore.away_team[i].running_score / scope.y_norm) * scope.graph.height)});
					scope.lineA = scope.lineA + ((i + 0.4) * scope.d_x) + ' ' + (scope.graph.height - (scope.linescore.away_team[i].running_score / scope.y_norm * scope.graph.height)) + ','
				};
				for (i = 0; i < scope.l_x; i++) {
					scope.datasetB.push({x : (i + 0.4) * scope.d_x, y : scope.graph.height - ((scope.linescore.home_team[i].running_score / scope.y_norm) * scope.graph.height)});
					scope.lineB = scope.lineB + ((i + 0.4) * scope.d_x) + ' ' + (scope.graph.height - (scope.linescore.home_team[i].running_score / scope.y_norm * scope.graph.height)) + ','
				};
				scope.lineA.slice(0, -1);
				scope.lineB.slice(0, -1);
			})			
		}
	}
})

directives.directive('scoring', function() {
	return {
		restrict: 'EA',
		replace: true,
		templateUrl: 'scoring.html',
		link: function(scope, elem, attrs) {
			scope.run = 0;
			scope.pass = 0;
			scope.called = 0;
			scope.unk = function(given) {
				var ans = (100 * (Math.tan((Math.PI / 2) - Math.atan(252 / given))));
				return ans
			};
			scope.player = function(given) { 
				var ans = (50 * (Math.tan((Math.PI / 2) - Math.atan(252 / given))));
				return ans
			};
			scope.loadPlay = function(ind) {
				scope.loadUp = scope.scores[ind]
				scope.giv = 0;
				scope.called = 1.5;
				if (scope.scores[ind].yards < 50) {
					scope.giv = (50 - scope.scores[ind].yards) * 3.3;
					scope.x1 = 350 + scope.giv;
					scope.x2 = 350 + scope.giv - scope.unk(scope.giv);
					scope.cx = 350 + (scope.giv - scope.player(scope.giv));
				}
				else {
					scope.giv = (scope.scores[ind].yards - 50) * 3.3;
					scope.x1 = 350 - scope.giv;
					scope.x2 = 350 - (scope.giv - scope.unk(scope.giv));
					scope.cx = 350 - (scope.giv - scope.player(scope.giv));
				}
				if (scope.scores[ind].play_type == 'Pass') {
					scope.midpoint = ((528 - scope.cx));
					scope.bezX1 = scope.cx + (scope.midpoint/4);
					scope.bezX2 = 528 - (scope.midpoint/4);
					scope.bezY1 = 100 - (scope.midpoint/4);
					scope.run = 0;
					scope.pass = 1.5;
					scope.path = 'M ' + scope.cx + ' 150 C ' + scope.bezX1 + ' ' + scope.bezY1 + ' , ' + scope.bezX2 + ' ' + scope.bezY1 + ' , 528 150';
				}
				else if (scope.scores[ind].play_type == 'Rush') {
					scope.run = 1.5;
					scope.pass = 0;
				}
				else {
					scope.run = 0;
					scope.pass = 0;
				}
			};
		}
	}
})