'use strict';


// Declare app level module which depends on filters, and services
angular.module('ToerhApp', [
  'ngRoute',
  'ngCookies',
  'ToerhApp.filters',
  'ToerhApp.services',
  'ToerhApp.directives',
  'ToerhApp.controllers'
]).
config(['$routeProvider', '$locationProvider', '$httpProvider', function($routeProvider, $locationProvider, $httpProvider) {
  $routeProvider.when('/', {
    templateUrl: 'partials/resource/resources.html', 
    controller: 'ResourceController'
  });

  $routeProvider.when('/login', {
    templateUrl: '/partials/auth/login.html',
    controller: 'AuthController'
  });

  $routeProvider.when('/resources/add', {
    templateUrl: '/partials/resource/addResource.html',
    controller: 'CreateController'
  });  

  $routeProvider.otherwise({redirectTo: '/view1'});

  $routeProvider.otherwise('/404');

  $locationProvider.html5Mode(false).hashPrefix('');

  $httpProvider.defaults.headers.common['X-Api-Token'] = "bf7a73e0260fb44f8f1e";
}]).
run(function(SessionService, ProtectedRoutes, $rootScope, $location) {
  $rootScope.$on('$locationChangeStart', function(event, next, current) {
    //console.log(SessionService.isAuthenticated());
    if (ProtectedRoutes.indexOf($location.path()) !== -1 && !SessionService.isAuthenticated()) {
      $location.url('/login');
    }
  });
});
