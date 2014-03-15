'use strict';

/* Filters */

angular.module('speechApp').filter('getOnlyRoleFilter', function() {
	return function(contestorScores, idrole) {
		if ( !contestorScores ){
			return null;
		}
		var arrayToReturn = [];
		for ( var i = 0; i < contestorScores.length; i++) {
			if (contestorScores[i].judge.role.idrole == idrole) {
				arrayToReturn.push(contestorScores[i]);
			}
		}
		return arrayToReturn;
	};
});
