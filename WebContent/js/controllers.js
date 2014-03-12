'use strict';

/* Controllers */

angular
		.module('speechApp.controllers', [])
		.controller(
				'judgeScoringController',
				[
						'$scope',
						'dataFactory',
						'stopwatch',
						'$routeParams',
						function($scope, dataFactory, stopwatch, $routeParams) {
							$scope.speechStopwatch = stopwatch;

							$scope.doSignAndSubmit = function() {
								// console.log(record);
								var tableName = "judge";
								var record = angular
										.copy($scope.selectedContestGroup.judge);
								record.submit = true;
								dataFactory
										.updateRecord(record, tableName)
										.success(
												function() {
													$scope.status = 'Updated '
															+ tableName;
													$scope.selectedContestGroup = null;
													$scope
															.selectedStaffChanged();
												})
										.error(
												function(error) {
													$scope.status = 'Unable to update '
															+ tableName
															+ ': '
															+ error.message;
												});
							};

							$scope.doIt = function() {
								alert("Hello");
								return false;
							};

							var loadContestors = function() {
								loadContestorsForJudgeToScore(
										$scope.selectedContestGroup.idcontest_group,
										$scope.selectedStaff.idstaff,
										$scope.selectedContestGroup.role.idrole);
							};

							var loadContestorsForJudgeToScore = function(
									idcontestGroup, idstaff, idrole) {
								dataFactory
										.getContestorsForJudgeToScore(
												idcontestGroup, idstaff, idrole)
										.success(
												function(resultSet) {
													$scope.contestorsForJudgeToScore = resultSet;
													console
															.log($scope.contestorsForJudgeToScore);
												})
										.error(
												function(error) {
													$scope.status = 'Unable to load '
															+ "Contestors for Judge to Score"
															+ ' data: '
															+ error.message;
												});
							};

							var loadSelectLoginStaffList = function() {
								dataFactory
										.getSelectLoginStaffList()
										.success(
												function(resultSet) {
													$scope.selectLoginStaffs = resultSet;
												})
										.error(
												function(error) {
													$scope.status = 'Unable to load '
															+ "select login staff list"
															+ ' data: '
															+ error.message;
												});
							};
							$scope.selectedStaffChanged = function() {
								if (null != $scope.selectedStaff.password
										&& "" != $scope.selectedStaff.password) {
									if ($scope.password != $scope.selectedStaff.password) {
										$("#passwordIncorrectModal").modal();
										return false;
									}
								}
								dataFactory
										.getSelectContestGroupListForLoginedStaff(
												$scope.selectedStaff.idstaff)
										.success(
												function(resultSet) {
													$scope.selectContestGroups = resultSet;
												})
										.error(
												function(error) {
													$scope.status = 'Unable to load '
															+ "select contest group list for selected staff"
															+ ' data: '
															+ error.message;
												});
							};
							$scope.selectedContestGroupChanged = function() {
								console.log($scope.selectedContestGroup);
								if (1 == $scope.selectedContestGroup.role.idrole) {
									$scope.isForJudge = true;
								} else if (2 == $scope.selectedContestGroup.role.idrole) {
									$scope.isForJudge = false;
								}
								loadContestors();
							};

							$scope.doScore = function(record) {
								$scope.contestorToScore = {};
								$scope.contestorToScore = angular.copy(record);
								$scope.isScoring = true;
							};

							$scope.submitScore = function(record) {
								console.log(record);
								var tableName = "speech_score";
								dataFactory
										.updateRecord(record, tableName)
										.success(
												function() {
													$scope.status = 'Updated '
															+ +'! Refreshing '
															+ tableName
															+ ' list.';
													loadContestors();
												})
										.error(
												function(error) {
													$scope.status = 'Unable to update '
															+ tableName
															+ ': '
															+ error.message;
												});
								$scope.isScoring = false;

							};

							loadSelectLoginStaffList();

						} ])
		.controller(
				'recordController',
				[
						'$scope',
						'dataFactory',
						'$routeParams',
						function($scope, dataFactory, $routeParams) {

							var TableName = $routeParams.tableName;

							var loadStaffs = function() {
								dataFactory.getAllRecords("staff").success(
										function(resultSet) {
											$scope.staffs = resultSet;
										}).error(
										function(error) {
											$scope.status = 'Unable to load '
													+ "staff" + ' data: '
													+ error.message;
										});
							};

							var loadRoles = function() {
								dataFactory.getAllRecords("role").success(
										function(resultSet) {
											$scope.roles = resultSet;
										}).error(
										function(error) {
											$scope.status = 'Unable to load '
													+ "role" + ' data: '
													+ error.message;
										});
							};

							var loadStudents = function() {
								dataFactory.getAllRecords("student").success(
										function(resultSet) {
											$scope.students = resultSet;
										}).error(
										function(error) {
											$scope.status = 'Unable to load '
													+ "student" + ' data: '
													+ error.message;
										});
							};

							var loadContestors = function() {
								dataFactory.getAllRecords("contestor").success(
										function(resultSet) {
											$scope.contestors = resultSet;
										}).error(
										function(error) {
											$scope.status = 'Unable to load '
													+ "contestor" + ' data: '
													+ error.message;
										});
							};
							var loadContestGroups = function() {
								dataFactory
										.getAllRecords("contest_group")
										.success(function(resultSet) {
											$scope.contestGroups = resultSet;
										})
										.error(
												function(error) {
													$scope.status = 'Unable to load '
															+ "contest_group"
															+ ' data: '
															+ error.message;
												});
							};
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
							} else if ("contestor" == TableName) {
								loadContestGroups();
							} else if ("contestor_individual" == TableName) {
								loadContestors();
								loadStudents();
							} else if ("judge" == TableName) {
								loadContestGroups();
								loadStaffs();
								loadRoles();
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
							var setUpSelectDropdownContestGroup = function() {
								var dom = jsel($scope.contestGroups);
								$scope.recordToUpdate.contestGroup = dom
										.select("//*[@idcontest_group='"
												+ $scope.recordToUpdate.contestGroup.idcontest_group
												+ "']");
							};
							var setUpSelectDropdownScoreRule = function() {
								var dom = jsel($scope.scoreRules);
								$scope.recordToUpdate.scoreRule = dom
										.select("//*[@idscore_rule='"
												+ $scope.recordToUpdate.scoreRule.idscore_rule
												+ "']");
							};
							var setUpSelectDropdownContest = function() {
								var dom = jsel($scope.contests);
								$scope.recordToUpdate.contest = dom
										.select("//*[@idcontest='"
												+ $scope.recordToUpdate.contest.idcontest
												+ "']");
							};
							var setUpSelectDropdownContestLocation = function() {
								var dom = jsel($scope.contestLocations);
								$scope.recordToUpdate.contestLocation = dom
										.select("//*[@idcontest_location='"
												+ $scope.recordToUpdate.contestLocation.idcontest_location
												+ "']");
								// console.log(
								// $scope.recordToUpdate.locationPlace );
							};
							var setUpSelectDropdownTimeLimitRule = function() {
								var dom = jsel($scope.timeLimitRules);
								$scope.recordToUpdate.timeLimitRule = dom
										.select("//*[@idtime_limit_rule='"
												+ $scope.recordToUpdate.timeLimitRule.idtime_limit_rule
												+ "']");
							};
							var setUpSelectDropdownScoreCountingType = function() {
								var dom = jsel($scope.scoreCountingTypes);
								$scope.recordToUpdate.scoreCountingType = dom
										.select("//*[@idscore_counting_type='"
												+ $scope.recordToUpdate.scoreCountingType.idscore_counting_type
												+ "']");
							};
							var setUpSelectDropdownContestGroup = function() {
								var dom = jsel($scope.contestGroups);
								$scope.recordToUpdate.contestGroup = dom
										.select("//*[@idcontest_group='"
												+ $scope.recordToUpdate.contestGroup.idcontest_group
												+ "']");
							};

							var setUpSelectDropdownContestor = function() {
								var dom = jsel($scope.contestors);
								$scope.recordToUpdate.contestor = dom
										.select("//*[@idcontestor='"
												+ $scope.recordToUpdate.contestor.idcontestor
												+ "']");
							};

							var setUpSelectDropdownStudent = function() {
								var dom = jsel($scope.students);
								$scope.recordToUpdate.student = dom
										.select("//*[@idstudent='"
												+ $scope.recordToUpdate.student.idstudent
												+ "']");
							};

							var setUpSelectDropdownStaff = function() {
								var dom = jsel($scope.staffs);
								$scope.recordToUpdate.staff = dom
										.select("//*[@idstaff='"
												+ $scope.recordToUpdate.staff.idstaff
												+ "']");
							};

							var setUpSelectDropdownRole = function() {
								var dom = jsel($scope.roles);
								$scope.recordToUpdate.role = dom
										.select("//*[@idrole='"
												+ $scope.recordToUpdate.role.idrole
												+ "']");
							};

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
								} else if ("contestor" == TableName) {
									setUpSelectDropdownContestGroup();
								} else if ("contestor_individual" == TableName) {
									setUpSelectDropdownStudent();
									setUpSelectDropdownContestor();
								} else if ("judge" == TableName) {
									setUpSelectDropdownContestGroup();
									setUpSelectDropdownStaff();
									setUpSelectDropdownRole();
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