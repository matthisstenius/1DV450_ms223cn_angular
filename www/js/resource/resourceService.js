'use strict';

var module = angular.module('ToerhApp.services');

module.factory('ResourceService', function($http, $window) {
	//var baseUri = 'http://toerh.matthis.se/api/v1/';
	var baseUri = 'http://toerh.dev/api/v1/';

	$http.defaults.headers.common.Authorization = $window.sessionStorage.token;

	return {
		all: function(url) {
			return $http.get(url);
		},

		show: function(id) {
			return $http.get(baseUri + 'resources/' + id);
		},

		store: function(resource) {
			return $http.post(baseUri + 'users/' + $window.sessionStorage.userid + '/resources.json', resource);
		},

		search: function(search) {
			return $http.get(baseUri + 'resources.json/?search=' + search.search);
		}
	};
});
