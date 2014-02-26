/* Factorys */

angular.module('speechApp').factory('dataFactory', [ '$http', function($http) {
	var urlBase = '/speechservice';
	var dataFactory = {};

	dataFactory.getAllRecords = function(tableName) {
		return $http.get(urlBase+"/"+tableName);
	};
	
	dataFactory.deleteRecord = function(id, tableName){
		return $http.delete(urlBase+"/"+tableName+"/"+id);
	};
	
	dataFactory.insertRecord = function (record, tableName) {
	        return $http.post(urlBase+"/"+tableName , record);
	};

	dataFactory.updateRecord = function (record, tableName) {
	        return $http.put(urlBase+"/"+tableName , record);
	};
	return dataFactory;

} ]);