/* Factorys */

angular.module('speechApp').factory('dataFactory', [ '$http', function($http) {
	var urlBase = '/speechservice/student';
	var dataFactory = {};

	dataFactory.getAllStudents = function() {
		return $http.get(urlBase);
	};
	
	dataFactory.deleteStudent = function(idstudent){
		return $http.delete(urlBase+"/"+idstudent);
	};
	
	dataFactory.insertStudent = function (student) {
	        return $http.post(urlBase, student);
	};

	dataFactory.updateStudent = function (student) {
	        return $http.put(urlBase , student);
	};
	return dataFactory;

} ]);