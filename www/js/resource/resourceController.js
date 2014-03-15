'use strict';

/* Controllers */

var module = angular.module('ToerhApp.controllers', []);

module.controller('ResourceController', function($scope, ResourceService) {
	loadResources('http://toerh.dev/api/v1/resources.json');

	$scope.next = function() {
		loadResources($scope.nextUrl);
	};

	$scope.resources = [];

	function loadResources(url) {
		var resources = ResourceService.all(url);
		$scope.loading = "Loading";
		resources.success(function(resources) {
			if (resources.items) {
				$scope.loading = "";

				angular.forEach(resources.items, function(resource, value) {
					$scope.resources.push(resource);
				});

				$scope.nextUrl = resources.pagination.next_url;
			}

			else {
				$scope.resourceMessage = "No resources found";
			}
		});

		resources.error(function(err) {
			console.log(err);
		});
	}
});
 