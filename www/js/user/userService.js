var module = angular.module('ToerhApp.services');

module.factory('UserService', function($http) {
    var baseUri = 'http://toerh.dev/api/v1/users/';

    return {
        user: function(userID) {
            return $http.get(baseUri + userID + '.json');
        }
    }
});