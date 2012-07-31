if(!window) window = {};

/**
* Module for aiesec applications
* @module aiesec
**/

window.aiesec = function(ko, $, undefined) {
	var aiesec = aiesec || {};

	/**
	* Filters used in order to look for TN's.
	* @constructor
	* @class TNFilterSearch
	* @namespace aiesec
	* @chainable
	*/
	aiesec.TNFilterSearch = function() {
		var self = {};

		self.searchScope = ko.observable({});
		self.typeOfInternship = ko.observable(["GCDP", "GIP"]);
		self.startDuration = ko.observable(6);
		self.endDuration = ko.observable(78);
		self.searchAreas = ko.observableArray([]);
		
		return self;
	}

	return aiesec;
}