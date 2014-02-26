'use strict';

angular.module('speechApp', [ 'ngRoute', 'speechApp.controllers' ]).config(
		[ '$routeProvider', function($routeProvider) {
			$routeProvider.when('/viewAllStaffs/:tableName', {
				templateUrl : 'partials/allStaffs.html',
				controller : 'staffController'
			});
			$routeProvider.when('/viewAllStudents/:tableName', {
				templateUrl : 'partials/allStudents1.html',
				controller : 'staffController'
			});
			$routeProvider.when('/view2', {
				templateUrl : 'partials/partial2.html',
				controller : 'MyCtrl2'
			});
			$routeProvider.otherwise({
				redirectTo : '/viewAllStudents/:tableName'
			});
		} ]);

// Declare app level module which depends on filters, and services
angular.module(
		'myApp',
		[ 'ngRoute', 'myApp.filters', 'myApp.services', 'myApp.directives',
				'myApp.controllers', 'studentServices' ]).config(
		[ '$routeProvider', function($routeProvider) {
			$routeProvider.when('/view1', {
				templateUrl : 'partials/partial1.html',
				controller : 'MyCtrl1'
			});
			$routeProvider.when('/view2', {
				templateUrl : 'partials/partial2.html',
				controller : 'MyCtrl2'
			});
			$routeProvider.otherwise({
				redirectTo : '/view1'
			});
		} ]);
