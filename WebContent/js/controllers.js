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
							var loadScoreRules = function() {
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
							};
							var loadContests = function() {
								dataFactory.getAllRecords("contest").success(
										function(resultSet) {
											$scope.contests = resultSet;
										}).error(
										function(error) {
											$scope.status = 'Unable to load '
													+ "contest" + ' data: '
													+ error.message;
										});
							};
							var loadContestLocatons = function() {
								dataFactory
										.getAllRecords("contest_location")
										.success(
												function(resultSet) {
													$scope.contestLocations = resultSet;
												})
										.error(
												function(error) {
													$scope.status = 'Unable to load '
															+ "contest location"
															+ ' data: '
															+ error.message;
												});
							};
							var loadTimeLimitRules = function() {
								dataFactory
										.getAllRecords("time_limit_rule")
										.success(function(resultSet) {
											$scope.timeLimitRules = resultSet;
										})
										.error(
												function(error) {
													$scope.status = 'Unable to load '
															+ "time_limit_rule"
															+ ' data: '
															+ error.message;
												});
							};
							var loadScoreCountingTypes = function() {
								dataFactory
										.getAllRecords("score_counting_type")
										.success(
												function(resultSet) {
													$scope.scoreCountingTypes = resultSet;
												})
										.error(
												function(error) {
													$scope.status = 'Unable to load '
															+ "score_counting_type"
															+ ' data: '
															+ error.message;
												});
							};
							if ("score_rule_item" == TableName) {
								loadScoreRules();
							} else if ("contest_group" == TableName) {
								loadScoreRules();
								loadContests();
								loadContestLocatons();
								loadScoreCountingTypes();
								loadTimeLimitRules();
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
							var setUpSelectDropdownScoreRule = function() {
								var dom = jsel($scope.scoreRules);
								$scope.recordToUpdate.scoreRule = dom
										.select("//*[@idscore_rule='"
												+ $scope.recordToUpdate.scoreRule.idscore_rule
												+ "']");
							}
							var setUpSelectDropdownContest = function() {
								var dom = jsel($scope.contests);
								$scope.recordToUpdate.contest = dom
										.select("//*[@idcontest='"
												+ $scope.recordToUpdate.contest.idcontest
												+ "']");
							}
							var setUpSelectDropdownContestLocation = function() {
								var dom = jsel($scope.contestLocations);
								$scope.recordToUpdate.contestLocation = dom
										.select("//*[@idcontest_location='"
												+ $scope.recordToUpdate.contestLocation.idcontest_location
												+ "']");
								// console.log(
								// $scope.recordToUpdate.locationPlace );
							}
							var setUpSelectDropdownTimeLimitRule = function() {
								var dom = jsel($scope.timeLimitRules);
								$scope.recordToUpdate.timeLimitRule = dom
										.select("//*[@idtime_limit_rule='"
												+ $scope.recordToUpdate.timeLimitRule.idtime_limit_rule
												+ "']");
							}
							var setUpSelectDropdownScoreCountingType = function() {
								var dom = jsel($scope.scoreCountingTypes);
								$scope.recordToUpdate.scoreCountingType = dom
										.select("//*[@idscore_counting_type='"
												+ $scope.recordToUpdate.scoreCountingType.idscore_counting_type
												+ "']");
							}

							$scope.doUpdate = function(record) {
								$scope.modalTitle = "Update this " + TableName;
								// console.log(record);
								// var loc = record.locationPlace;
								// console.log(loc);
								// var locCopy = angular.copy(loc);
								// console.log(locCopy);
								$scope.recordToUpdate = angular.copy(record);
								// $scope.recordToUpdate.locationPlace =
								// locCopy;
								// $scope.recordToUpdate = record;
								// console.log($scope.recordToUpdate);
								if (TableName == "score_rule_item") {
									setUpSelectDropdownScoreRule();
								} else if ("contest_group" == TableName) {
									setUpSelectDropdownContest();
									setUpSelectDropdownContestLocation();
									setUpSelectDropdownScoreCountingType();
									setUpSelectDropdownScoreRule();
									setUpSelectDropdownTimeLimitRule();
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
									console.log(TableName + " " + "new record"
											+ " inserted", record);
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