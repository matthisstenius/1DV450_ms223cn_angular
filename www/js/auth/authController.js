var module = angular.module('ToerhApp.controllers');

module.controller('AuthController', function($scope, $window, AuthService, $cookies, $rootScope, $location, SessionService) {
	$scope.isLoggedIn = function() {
		return SessionService.isAuthenticated();	
	};

	$scope.login = function() {
		var auth = AuthService.auth({
			email: $scope.email,
			password: $scope.password,
		});

		auth.success(function(authorized) {
			$window.sessionStorage.token = authorized.access_token;
			$window.sessionStorage.userid = authorized.user.user_id;

			$location.url('/resources');
		});

		auth.error(function(err) {
			console.log(err);
		});
	};

	$scope.logout = function() {
		delete $window.sessionStorage.token;
		delete $window.sessionStorage.userid;
		$location.url('/login');
	};

	$rootScope.$on('reAuthenticate', function() {
		$scope.logout();
	});
});
