'use strict';

/* Filters */

angular.module('speechApp').filter('getOnlyRoleFilter', function() {
	return function(contestorScores, idroles) {
		if (!contestorScores) {
			return null;
		}
		
		var isInRoles = function(id, idroles){
			for( var i = 0 ; i < idroles.length; i++){
				if ( id == idroles[i]){
					return true;
				}
			}
			return false;
		};
		var arrayToReturn = [];
		for ( var i = 0; i < contestorScores.length; i++) {
			if ( isInRoles( contestorScores[i].judge.role.idrole, idroles)) {
				arrayToReturn.push(contestorScores[i]);
			}
		}
		return arrayToReturn;
	};
}).filter(
		'mergeAllContestorsFilter',
		function() {
			return function(contestorScores) {
				console.log(contestorScores);
				if (!contestorScores) {
					return null;
				}

				function sortByKey(array, key) {
					return array.sort(function(a, b) {
						var x = a[key];
						var y = b[key];
						return ((x < y) ? -1 : ((x > y) ? 1 : 0));
					});
				}

				var arrayToReturn = [];
				for ( var i = 0; i < contestorScores.length; i++) {
					var speechScores = contestorScores[i].speechScores;
					speechScores = sortByKey(speechScores,
							'scoreRuleItem.idscore_rule_item');
					// console.log(speechScores);
					for ( var j = 0; j < speechScores.length; j++) {
						arrayToReturn.push(speechScores[j]);
					}
				}
				//console.log(arrayToReturn);
				return arrayToReturn;
			};
		});
