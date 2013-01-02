/**
* Module for aiesec applications
* @module aiesec
**/

var aiesec = (function(aiesec, undefined) {
	var aiesec = aiesec || {};

	/**
	* Filters used in order to look for TN's.
	* @constructor
	* @class tnMonitor
	* @namespace aiesec
	* @chainable
	*/
	aiesec.tnMonitor = function() {

		var self = {};
		var TN_MONITOR_KEY = "monitoredTNs";

		self.removeTn = function(TN) {
			self.monitoredTNs.remove(TN);
			
			chrome.storage.local.get( TN_MONITOR_KEY, function(TNsHashMap) {
				if(!TNsHashMap[TN_MONITOR_KEY]) {
        			// First time, we need to ensure there's a map to hold our results.
        			TNsHashMap = {};
        			TNsHashMap[TN_MONITOR_KEY]= {};
        		}

        		var TNsHashMapObject = TNsHashMap[TN_MONITOR_KEY];
        		delete TNsHashMapObject[TN.id];

        		var TNsHashMapObjectTemp = {};
        		TNsHashMapObjectTemp[TN_MONITOR_KEY] = TNsHashMapObject;
        			
        		chrome.storage.local.set( TNsHashMapObjectTemp, function() { 
        			chrome.storage.local.remove( TN.id, function() {
        				// We added a flag indicating we are storing a TN
        				console.log("Removed TN successfully");
        			});
				});
        	});
		}

		self.loadMonitoredTNs = function() {
			chrome.storage.local.get( TN_MONITOR_KEY, function(TNsHashMap) {
				if(!TNsHashMap[TN_MONITOR_KEY]) {
        			// Empty Monitored TN's.
        			TNsHashMap = {};
        			TNsHashMap[TN_MONITOR_KEY]= {};
        		}

        		var monitoredTNsArray = [];
        		var TNsHashMapObject = TNsHashMap[TN_MONITOR_KEY];
        		for (var key in TNsHashMapObject) {
        			if(TNsHashMapObject.hasOwnProperty(key)) {
        				console.log(TNsHashMapObject[key])
        				monitoredTNsArray.push(TNsHashMapObject[key]);
        			}
        		}

        		self.monitoredTNs(monitoredTNsArray);
        	});
		}

		self.monitoredTNs = ko.observableArray([]);
		self.isEmpty = ko.computed(function(){
			return self.monitoredTNs().length == 0;
		})
		

		self.init = function() {
			self.loadMonitoredTNs();
			return self;
		}

		return self.init();
	}

	return aiesec;
})(aiesec);