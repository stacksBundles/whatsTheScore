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