var app = angular.module('ScaffoldsApp', ['ScaffoldsApp.directives', 'ScaffoldsApp.services', 'ScaffoldsApp.controllers'])


// Using a routeProvider even though there's only one view, mainly to allow future
// changes to be easily implemented. Templates are retrieved using calls to Django.
app.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
      })
      .otherwise({
        redirectTo: '/'
      });
  });

app.filter('startFrom', function() {
	return function (input, start) {
    if (input) {
      start = +start;
      console.log(input[start])
      return input[start];
    }
	}
})

app.filter('perc', function() {
  return function (input) {
    if (input) {
      var per = input * 100;
      return per.toFixed(0);
    }
  }
})