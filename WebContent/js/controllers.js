'use strict';

/* Controllers */

angular
		.module('speechApp.controllers', [])
		.controller(
				'staffController',
				[
						'$scope',
						'dataFactory',
						'$routeParams',
						function($scope, dataFactory, $routeParams) {

							var TableName = $routeParams.tableName;
							var IdColName = "id" + TableName;

							$scope.status;
							$scope.records;

							getAll();

							function getAll() {
								dataFactory.getAllRecords(TableName).success(
										function(resultSet) {
											$scope.records = resultSet;
										}).error(
										function(error) {
											$scope.status = 'Unable to load '
													+ TableName + ' data: '
													+ error.message;
										});
							}

							function deleteRecord(id) {
								dataFactory
										.deleteRecord(id, TableName)
										.success(function(result) {
											getAll();
										})
										.error(
												function(error) {
													$scope.status = 'Unable to delete '
															+ TableName
															+ ' data: '
															+ error.message;
												});
							}

							// var refreshData = function() {
							// $scope.students = studentFactory
							// .getAllStudents();
							// };
							// refreshData();
							// $scope.students = dataFactory.getAllStudents();

							$scope.doUpdate = function(record) {
								$scope.modalTitle = "Update this " + TableName;
								$scope.recordToUpdate = angular.copy(record);
							};

							$scope.doCreate = function() {
								$scope.modalTitle = "Create a new " + TableName;
								// if (!$scope.studentToUpdate) {
								$scope.recordToUpdate = {};
								// }
							};

							$scope.submitUpdate = function(record) {
								if (record[IdColName]) {
									updateRecord(record);
									console.log(TableName + " "
											+ record[IdColname] + " updated");
									$scope.recordToUpdate = {};
								} else {
									insertRecord(record);
									console.log(TableName + " "
											+ record[IdColname] + " inserted");
									$scope.recordToUpdate = {};
								}

							};

							$scope.doDelete = function(record) {
								bootbox
										.confirm(
												"Are you sure you want to delete this "
														+ TableName + ": "
														+ record[IdColname],
												function(result) {
													if (result) {
														deleteRecord(record[IdColName]);
														console
																.log(TableName
																		+ " "
																		+ record[IdColName]
																		+ " deleted");
													}
												});
							};
							// var t = setInterval(refreshData, 5000);
							// //////////////////////////////
							// update
							// //////////////////////////////
							var updateRecord = function(record) {
								dataFactory
										.updateRecord(record, TableName)
										.success(
												function() {
													$scope.status = 'Updated '
															+ TableName
															+ '! Refreshing '
															+ TableName
															+ ' list.';
													getAll();
												})
										.error(
												function(error) {
													$scope.status = 'Unable to update '
															+ TableName
															+ ': '
															+ error.message;
												});
							};
							// ////////////////////////////////
							// insert
							// /////////////////////////////////
							var insertRecord = function(record) {
								dataFactory
										.insertRecord(record, TableName)
										.success(
												function() {
													$scope.status = 'Inserted '
															+ TableName
															+ '! Refreshing '
															+ TableName
															+ ' list.';
													getAll();
												})
										.error(
												function(error) {
													$scope.status = 'Unable to insert '
															+ TableName
															+ ': '
															+ error.message;
												});
							};
						} ])
		.controller(
				'studentController',
				[
						'$scope',
						'dataFactory',
						function($scope, dataFactory) {
							var TableName = "student";
							var StaffTableName = "staff";

							$scope.status;
							$scope.students;

							getAllStudents();

							function getAllStudents() {
								dataFactory
										.getAllRecords(TableName)
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
										.deleteRecord(idstudent, TableName)
										.success(function(result) {
											getAllStudents();
										})
										.error(
												function(error) {
													$scope.status = 'Unable to delete student data: '
															+ error.message;
												});
							}

							// var refreshData = function() {
							// $scope.students = studentFactory
							// .getAllStudents();
							// };
							// refreshData();
							// $scope.students = dataFactory.getAllStudents();

							$scope.doUpdate = function(student) {
								$scope.modalTitle = "Update this Student";
								$scope.studentToUpdate = angular.copy(student);
							};

							$scope.doCreate = function() {
								$scope.modalTitle = "Create a new Student";
								// if (!$scope.studentToUpdate) {
								$scope.studentToUpdate = {};
								// }
							};

							$scope.submitUpdate = function(student) {
								if (student.idstudent) {
									updateStudent(student);
									console.log("Student "
											+ student.chineseLastName
											+ student.chineseFirstName
											+ " updated");
									$scope.studentToUpdate = {};
								} else {
									insertStudent(student);
									console.log("Student "
											+ student.chineseLastName
											+ student.chineseFirstName
											+ " inserted");
									$scope.studentToUpdate = {};
								}

							};

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
							var updateStudent = function(student) {
								dataFactory
										.updateRecord(student, TableName)
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
							var insertStudent = function(student) {
								dataFactory
										.insertRecord(student, TableName)
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