'use strict';

/* Controllers */

angular
		.module('speechApp.controllers', [])
		.controller(
				'allStudentController',
				[
						'$scope',
						'dataFactory',
						function($scope, dataFactory) {

							$scope.status;
							$scope.students;

							getAllStudents();

							function getAllStudents() {
								dataFactory
										.getAllStudents()
										.success(function(students) {
											$scope.students = students;
										})
										.error(
												function(error) {
													$scope.status = 'Unable to load student data: '
															+ error.message;
												});
							}

							function deleteStudent(idstudent) {
								dataFactory
										.deleteStudent(idstudent)
										.success(function(result) {
											getAllStudents();
										})
										.error(
												function(error) {
													$scope.status = 'Unable to delete student data: '
															+ error.message;
												});
							}

							var refreshData = function() {
								$scope.students = studentFactory
										.getAllStudents();
							};
							// refreshData();
							// $scope.students = dataFactory.getAllStudents();

							$scope.doDelete = function(student) {
								bootbox
										.confirm(
												"Are you sure you want to delete this student: "
														+ student.chineseLastName
														+ student.chineseFirstName,
												function(result) {
													if (result) {
														deleteStudent(student.idstudent);
														console
																.log("Student "
																		+ student.idstudent
																		+ " deleted");
													}
												});
							};
							// var t = setInterval(refreshData, 5000);
							// //////////////////////////////
							// update
							// //////////////////////////////
							$scope.updateStudent = function(student) {
								dataFactory
										.updateStudent(student)
										.success(
												function() {
													$scope.status = 'Updated Student! Refreshing Student list.';
													getAllStudents();
												})
										.error(
												function(error) {
													$scope.status = 'Unable to update student: '
															+ error.message;
												});
							};
							// ////////////////////////////////
							// insert
							// /////////////////////////////////
							$scope.insertStudent = function(student) {

								dataFactory
										.insertStudent(student)
										.success(
												function() {
													$scope.status = 'Inserted Student! Refreshing student list.';
													getAllStudents();
												})
										.error(
												function(error) {
													$scope.status = 'Unable to insert student: '
															+ error.message;
												});
							};
						} ]);

// //////////////////////////////////////////////

angular.module('myApp.controllers', []).controller('MyCtrl1',
		[ '$scope', 'studentFactory', function($scope, studentFactory) {
			$scope.students = studentFactory.query();
		} ]).controller('MyCtrl2', [ function() {

} ]);