var module = angular.module('ToerhApp.controllers');

module.controller('SearchController', function($scope, $routeParams, ResourceService) {
	var resources = ResourceService.search($routeParams);

	resources.success(function(resources) {

	});

	resources.error(function(err) {
		console.log(err);
	});
});