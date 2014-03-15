'use strict';

var module = angular.module('ToerhApp.controllers');

module.controller('UserController', function($scope, $rootScope, UserService, ResourceService) {
    var user = UserService.user(window.sessionStorage.userid);

    user.success(function(user) {
        $scope.user = user.items.data;
        console.log(user);

        userResources('http://toerh.dev/api/v1/users/' + $scope.user.user_id + '/resources.json');
    });

    user.error(function(err) {
        console.log(err);
    });

    $scope.removeResource = function(id) {
        var destroyResource = ResourceService.destroy($scope.user.user_id, id);

        destroyResource.success(function() {
            $scope.userMessage = "Successfully removed resource";
        });

        destroyResource.error(function(err) {
            console.log(err);

            if (err.status == 401) {
                $rootScope.$broadcast('reAuthenticate');
            }
        });
    };

    $scope.next = function() {
        if ($scope.count === 25) {
            userResources($scope.nextUrl);
        }
    };

    function userResources(url) {
        var userResources = ResourceService.byUser(url);

        userResources.success(function(resources) {
            $scope.resources = resources.items;
            $scope.nextUrl = resources.pagination.next_url;
            $scope.count = resources.count;

            if ( ! resources.items) {
                $scope.resourceMessage = "No resources could be found";
            }
        });

        userResources.error(function(err) {
            console.log(err);
        });
    }
});