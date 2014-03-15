/* Factorys */

angular.module('speechApp').factory('dataFactory', [ '$http', function($http) {
	var urlBase = '/speechservice';
	var dataFactory = {};
	
	dataFactory.getContestorsByContestGroupId = function(id) {
		return $http.get(urlBase+"/"+"contestor/contest_group/" + id);
	};
	
	dataFactory.getActivateContestContestGroups = function() {
		return $http.get(urlBase+"/"+"contest_group/onlyActivateContest");
	};
	
	dataFactory.getContestorsForJudgeToScore = function(idcontestGroup, idstaff, idrole) {
		return $http.get(urlBase+"/contestor"+"/contest_group/"+idcontestGroup+"/staff/"+idstaff+"/role/"+idrole);
	};
	
	dataFactory.getSelectContestGroupListForLoginedStaff = function(idstaff) {
		return $http.get(urlBase+"/"+"contest_group/staff/" + idstaff);
	};
	
	dataFactory.getSelectLoginStaffList = function() {
		return $http.get(urlBase+"/"+"staff/loginList");
	};

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

} ]).constant('SW_DELAI', 100)
.factory('stopwatch', function (SW_DELAI,$timeout) {
    var data = { 
            value: 0,
            m: "00",
            s: "00",
            ms: "0",
            laps: []
        },
        stopwatch = null;
        
    var start = function () {;
        stopwatch = $timeout(function() {
            data.value++;
            pushToHMS();
            start();
        }, SW_DELAI);
    };

    var stop = function () {
        $timeout.cancel(stopwatch);
        stopwatch = null;
    };
    
    var pad = function (num, size) {
    	var s = "0000" + num;
    	return s.substr(s.length - size);
    }
    
    var pushToHMS = function () {
    	var divid = SW_DELAI / 10;
        var time = data.value;
    	data.m = pad(Math.floor( time / (60 * divid) ),2);
    	time = time % (60 * divid);
    	data.s = pad(Math.floor( time / divid ),2);
    	data.ms = time % divid;
    }

    var reset = function () {
        stop()
        data.value = 0;
        pushToHMS();
        data.laps = [];
    };

    var lap = function () {
        data.laps.push(data.value);
    };

    return {
        data: data,
        start: start,
        stop: stop,
        reset: reset,
        lap: lap
    };
});