'use strict';

var module = angular.module('ToerhApp.controllers');

module.controller('CreateController', function($scope, $rootScope, ResourceService, LicenceService, ResourceTypeService) {

	var licences = LicenceService.all();

	licences.success(function(licences) {
		$scope.licences = licences.items;
	});

	licences.error(function(err) {
		console.log(err);
	});

	var resourceTypes = ResourceTypeService.all();

	resourceTypes.success(function(resourceTypes) {
		$scope.resourceTypes = resourceTypes.items;
	});

	resourceTypes.error(function(err) {
		console.log(err);
	});

	$scope.create = function() {
		console.log($scope.resource)

		if (typeof($scope.resource.tags) == 'string') {
			$scope.resource.tags = $scope.resource.tags.split(',');
		}

		var store = ResourceService.store($scope.resource);

		store.success(function(resource) {
			console.log(resource);
		});

		store.error(function(err) {
			console.log(err);
			if (err.status == 401) {
				$rootScope.$broadcast('reAuthenticate');
			}
		});
	}
});