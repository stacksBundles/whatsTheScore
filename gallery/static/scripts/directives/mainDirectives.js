var directives = angular.module('ScaffoldsApp.directives', []);

// A stub directive is instantiated for each sidebar game. The linking function
// calls the queryService with the appropriate game code
directives.directive('stub', function(queryService, filterService) {
	return {
		restrict: 'E',
		link: function(scope, elem, attrs) {

			scope.loadgame = function(code) {
				queryService.getGame(code);
			};

		}
	}
})

// teambox directives use an isolated scope to prevent them from changing each other's
// variables.  The linking function controls the display logic.
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
				scope.team.stats = type;
			}

			// a little CSS animation to keep things stylish
			scope.$on('hide', function() {
				elem.addClass('fadeOut');
			})

			scope.$on('show', function() {
				elem.removeClass('fadeOut');
			})
		}
	}
})

directives.directive('weekpicker', function(filterService) {
	return {
		restrict: 'E',
		link: function (scope, elem, attrs) {
			scope.changeWeek = function(week) {
				filterService.set(week);
			}
		}
	}
})