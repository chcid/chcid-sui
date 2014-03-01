'use strict';

/* Controllers */

angular
		.module('speechApp.controllers', [])
		.controller(
				'recordController',
				[
						'$scope',
						'dataFactory',
						'$routeParams',
						function($scope, dataFactory, $routeParams) {

							var TableName = $routeParams.tableName;
							if (TableName == "score_rule_item") {
								dataFactory
										.getAllRecords("score_rule")
										.success(function(resultSet) {
											$scope.scoreRules = resultSet;
										})
										.error(
												function(error) {
													$scope.status = 'Unable to load '
															+ "score_rule"
															+ ' data: '
															+ error.message;
												});

							}
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
								if (TableName == "score_rule_item") {
									var dom = jsel($scope.scoreRules);
									$scope.recordToUpdate.scoreRule = dom
											.select("//*[@idscore_rule='"
													+ $scope.recordToUpdate.scoreRule.idscore_rule
													+ "']");
								}
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
											+ record[IdColName] + " updated",
											record);
									$scope.recordToUpdate = {};
								} else {
									insertRecord(record);
									console.log(TableName + " "
											+ record[IdColName] + " inserted",
											record);
									$scope.recordToUpdate = {};
								}

							};

							$scope.doDelete = function(record) {
								bootbox
										.confirm(
												"Are you sure you want to delete this "
														+ TableName
														+ ": "
														+ JSON
																.stringify(record),
												function(result) {
													if (result) {
														deleteRecord(record[IdColName]);
														console
																.log(
																		TableName
																				+ " "
																				+ record[IdColName]
																				+ " deleted",
																		record);
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
						} ]);

// //////////////////////////////////////////////

angular.module('myApp.controllers', []).controller('MyCtrl1',
		[ '$scope', 'studentFactory', function($scope, studentFactory) {
			$scope.students = studentFactory.query();
		} ]).controller('MyCtrl2', [ function() {

} ]);