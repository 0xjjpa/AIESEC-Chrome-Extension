/**
* Module for aiesec applications
* @module aiesec
**/

var aiesec = (function(aiesec, undefined) {
	var aiesec = aiesec || {};

	/**
	* Bootstrap for the TN Monitor Tool that wraps all the required libraries.
	* @constructor
	* @class bootstrapMonitor
	* @namespace aiesec
	* @chainable
	*/
	aiesec.bootstrapMonitorTn = function() {
		var self = {};

		self.tnMonitor = ko.observable({});

		self.wasLoadedSuccessfully = function() {
			for (var key in self) {
				if(self.hasOwnProperty(key) && !self[key] instanceof Function) {			
					if(typeof self[key] === 'undefined') return false;
				}
			}
			return true;
		}

		self.init = function() {
			self.tnMonitor(new aiesec.tnMonitor());			
			return self.wasLoadedSuccessfully() ? self : {};			
		}

		return self.init();
	}
			
	return aiesec;
})(aiesec)