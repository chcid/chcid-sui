'use strict';

angular.module('speechApp', [ 'ngRoute', 'speechApp.controllers' ]).config(
		[ '$routeProvider', function($routeProvider) {
			$routeProvider.when('/judgeScoring', {
				templateUrl : 'partials/judgeScoring.html',
				controller : 'judgeScoringController'
			});
			$routeProvider.when('/viewAllStaffs/:tableName', {
				templateUrl : 'partials/allStaffs.html',
				controller : 'recordController'
			});
			$routeProvider.when('/viewAllStudents/:tableName', {
				templateUrl : 'partials/allStudents.html',
				controller : 'recordController'
			});
			$routeProvider.when('/viewAllContests/:tableName', {
				templateUrl : 'partials/allTwoColumnRecords.html',
				controller : 'recordController'
			});
			$routeProvider.when('/viewAllContestLocations/:tableName', {
				templateUrl : 'partials/allTwoColumnRecords.html',
				controller : 'recordController'
			});
			$routeProvider.when('/viewAllRoles/:tableName', {
				templateUrl : 'partials/allTwoColumnRecords.html',
				controller : 'recordController'
			});
			$routeProvider.when('/viewAllScoreCountingTypes/:tableName', {
				templateUrl : 'partials/allTwoColumnRecords.html',
				controller : 'recordController'
			});
			$routeProvider.when('/viewAllScoreRules/:tableName', {
				templateUrl : 'partials/allTwoColumnRecords.html',
				controller : 'recordController'
			});
			$routeProvider.when('/viewAllTimeLimitRules/:tableName', {
				templateUrl : 'partials/allTimeLimitRules.html',
				controller : 'recordController'
			});
			$routeProvider.when('/viewAllScoreRuleItems/:tableName', {
				templateUrl : 'partials/allScoreRuleItems.html',
				controller : 'recordController'
			});
			$routeProvider.when('/viewAllContestGroups/:tableName', {
				templateUrl : 'partials/allContestGroups.html',
				controller : 'recordController'
			});
			$routeProvider.when('/viewAllContestors/:tableName', {
				templateUrl : 'partials/allContestors.html',
				controller : 'recordController'
			});
			$routeProvider.when('/viewAllContestorIndividuals/:tableName', {
				templateUrl : 'partials/allContestorIndividuals.html',
				controller : 'recordController'
			});
			$routeProvider.when('/viewAllJudges/:tableName', {
				templateUrl : 'partials/allJudges.html',
				controller : 'recordController'
			});
			$routeProvider.otherwise({
				redirectTo : '/viewAllJudges/judge'
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
