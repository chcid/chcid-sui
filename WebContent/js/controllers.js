'use strict';

/* Controllers */

angular.module('speechApp.controllers', []).controller('allStudentController',
		[ '$scope', 'studentFactory', function($scope, studentFactory) {

			var refreshData = function() {
				$scope.students = studentFactory.query();
			};
			refreshData();
			var t = setInterval(refreshData, 5000);
		} ]);

// //////////////////////////////////////////////

angular.module('myApp.controllers', []).controller('MyCtrl1',
		[ '$scope', 'studentFactory', function($scope, studentFactory) {
			$scope.students = studentFactory.query();
		} ]).controller('MyCtrl2', [ function() {

} ]);