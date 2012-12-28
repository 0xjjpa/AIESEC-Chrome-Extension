/**
* Module for aiesec applications
* @module aiesec
**/

var aiesec = (function(aiesec, undefined) {
	var aiesec = aiesec || {};

	/**
	* Filters used in order to look for TN's.
	* @constructor
	* @class chat
	* @namespace aiesec
	* @chainable
	*/
	aiesec.chat = function() {
		var self = {};

		/**
		* Lobby that holds all the current logged users.
		* @property lobby
		* @type {Array}
		**/
		self.lobby = ko.observableArray([]);

		return self;
	}

	return aiesec;
})(aiesec);