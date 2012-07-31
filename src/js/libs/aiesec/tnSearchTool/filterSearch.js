/**
* Module for aiesec applications
* @module aiesec
**/

var aiesec = (function(aiesec, undefined) {
	var aiesec = aiesec || {};

	var searchScope = function(name, scopeValue, hasSubscope) {
		var self = {};		 				
		self.name = ko.observable(name);		
		self.scopeValue = ko.observable(scopeValue);		
		self.hasSubscope = ko.observable(hasSubscope);
		return self;		
	}

	/**
	* Filters used in order to look for TN's.
	* @constructor
	* @class TNFilterSearch
	* @namespace aiesec
	* @chainable
	*/
	aiesec.filterSearch = function() {
		var self = {};		
		var api = new aiesec.api();

		self.typeOfInternship = ko.observable(["Global Internship", "Global Community Development"]);
		self.selectedTypeOfExchange = ko.observable();

		self.startDuration = ko.observable(6);
		self.endDuration = ko.observable(78);

		self.startDurationOptions = ko.computed(function() {
			var options = [];
			var startDuration = self.startDuration();			
			for(var i = 0; startDuration+i <= 78; i++) {
				options[i] = startDuration + i;
			}
			return options;
		});

		self.endDurationOptions = ko.computed(function() {
			var options = [];
			var startDuration = self.startDuration();
			var endDuration = self.endDuration() > startDuration ? self.endDuration() : 78;			
			for(var i = 0; startDuration+i <= endDuration; i++) {
				options[i] = startDuration + i;
			}
			return options;
		});
		
		self.searchScope = ko.observableArray(
			[new searchScope("AIESEC International", 13426545),
			new searchScope("Region", "regionalList"), 
			new searchScope("Country", "nationalList")]
			);

		self.selectedScope = ko.observable();
		self.selectedScopeHasSubscope = ko.observable();

		self.searchSubscope = ko.observableArray();
		self.selectedSubscope = ko.observable();

		var onScopeChange = function(scopeValue) {
			switch(scopeValue) {
				case 13426545: //International
				self.selectedSubscope({});
				self.selectedScopeHasSubscope(false);
				break; 				
				case "regionalList":				
				self.searchSubscope(
					[new searchScope("Asia Pacific", 3), 
					new searchScope("Middle East and North Africa", 5),
					new searchScope("Western Europe and North America", 2),
					new searchScope("Central and Eastern Europe", 4),
					new searchScope("Iberoamerica", 6),
					new searchScope("Africa", 1)]
					);
				self.selectedSubscope(self.searchSubscope()[0]);
				self.selectedScopeHasSubscope(true);
				break;
				case "nationalList":
												
				var container = [];
				api.getNationalList(container);
				
				self.selectedSubscope(self.searchSubscope()[0]);
				self.selectedScopeHasSubscope(true);
				break;
		}			
}

self.selectedScope.subscribe(onScopeChange);

self.init = function() {
	self.selectedTypeOfExchange(self.typeOfInternship()[0]);
	self.selectedScope(self.searchScope()[0]);
	return self;
}

return self.init();
}

return aiesec;
})(aiesec)