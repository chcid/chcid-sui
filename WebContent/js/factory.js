/* Factorys */

angular.module('speechApp').factory('dataFactory', [ '$http', function($http) {
	var urlBase = '/speechservice/student';
	var dataFactory = {};

	dataFactory.getAllStudents = function() {
		return $http.get(urlBase);
	};
	
	dataFactory.deleteStudent = function(idstudent){
		return $http.delete(urlBase+"/"+idstudent);
	}

	return dataFactory;

} ]);