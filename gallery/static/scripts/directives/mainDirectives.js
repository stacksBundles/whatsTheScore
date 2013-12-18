var directives = angular.module('ScaffoldsApp.directives', []);

directives.directive('stub', function(queryService) {
	return {
		restrict: 'E',
		link: function(scope, elem, attrs) {

			scope.loadgame = function(code) {
				console.log(code);
				queryService.getGame(code);
			};
		}
	}
})

directives.directive('teambox', function() {
	return {
		restrict: 'E',
		scope: {
			isoloaded: '='
		},
		link: function(scope, elem, attrs) {
			scope.team = {
				stats: 'off'
			}

			scope.team.switch = function(type) {
				console.log('switch: ' + type);
				scope.team.stats = type;
			}
		}
	}
})