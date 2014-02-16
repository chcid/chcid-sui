'use strict';

/* Services */

// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', []).value('version', '0.1');

var studentServices = angular.module('studentServices', [ 'ngResource' ]);

studentServices.factory('studentFactory', [ '$resource', function($resource) {
	return $resource('/speechservice/student', {}, {
		query : {
			method : 'GET',
			isArray : true
		}
	});
} ]);