/**
* Module for aiesec applications
* @module aiesec
**/

var aiesec = (function(aiesec, undefined) {
	var aiesec = aiesec || {};

	/**
	* Bootstrap for the AIESEC Chat
	* @constructor
	* @class bootstrapChat
	* @namespace aiesec
	* @chainable
	*/
	aiesec.bootstrapChat = function() {
		var self = {};

		self.chat = ko.observable({});

		self.wasLoadedSuccessfully = function() {
			for (var key in self) {
				if(self.hasOwnProperty(key) && !self[key] instanceof Function) {			
					if(typeof self[key] === 'undefined') return false;
				}
			}
			return true;
		}

		self.init = function() {
			self.chat(new aiesec.chat());			
			return self.wasLoadedSuccessfully() ? self : {};			
		}

		return self.init();
	}
			
	return aiesec;
})(aiesec)