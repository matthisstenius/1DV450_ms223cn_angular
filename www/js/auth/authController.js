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

			$location.url('/profile');
		});

		auth.error(function(err) {
			if (err.status == 400) {
				$scope.message = "Wrong username or password.";
			}
		});
	};

	$scope.logout = function() {
		delete $window.sessionStorage.token;
		delete $window.sessionStorage.userid;
		$location.url('/login');
	};

	$rootScope.$on('reAuthenticate', function(message) {
		$scope.logout();
		$scope.message = "The session has expired. Please login again.";
	});
});
