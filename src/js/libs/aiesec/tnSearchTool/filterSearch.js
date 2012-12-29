/**
* Module for aiesec applications
* @module aiesec
**/

var aiesec = (function(aiesec, undefined) {
	var aiesec = aiesec || {};

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

		self.searchResults = ko.observableArray([]);

		self.typeOfInternship = ko.observable([{label:"Global Internship", value: "GI"}, {label:"Global Community Development", value: "GC"}]);
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
		
		self.searchScopeOptions = ko.observableArray(
			[{name:"AIESEC International", scopeValue: 13426545},
			{name: "Region", scopeValue: 2}, //Regional Scope value is 2
			{name:"Country", scopeValue: 3}]); // Country Scope value is 3

		self.selectedScope = ko.observable();
		self.selectedScopeLevel = ko.observable();
		self.selectedScopeHasSubscope = ko.observable();

		self.searchSubscopeOptions = ko.observableArray();
		self.selectedSubscope = ko.observable();

		var onScopeChange = function(scopeValue) {
			switch(scopeValue) {
				case 13426545: //International id provided by MyAIESEC
				self.selectedScopeLevel('international');
				self.selectedSubscope(1);
				self.selectedScopeHasSubscope(false);
				break; 				

				case 2:	
				self.selectedScopeLevel('regional');			
				self.searchSubscopeOptions(
					[{name: "Asia Pacific", scopeValue: 3}, 
					{name:"Middle East and North Africa", scopeValue:5},
					{name:"Western Europe and North America", scopeValue:2},
					{name:"Central and Eastern Europe", scopeValue:4},
					{name:"Iberoamerica", scopeValue:6},
					{name:"Africa", scopeValue:1}]
					);
				self.selectedSubscope(self.searchSubscopeOptions()[0]);
				self.selectedScopeHasSubscope(true);
				break;

				case 3:
				self.selectedScopeLevel('national');
				var nationalListContainer = localStorage.getItem('nationalListContainer');
				
				if(nationalListContainer) {
					self.searchSubscopeOptions(JSON.parse(nationalListContainer));
				} else {
					api.getNationalList(self.searchSubscopeOptions);
				}
				self.selectedSubscope(self.searchSubscopeOptions()[0]);
				self.selectedScopeHasSubscope(true);
				break;
			}
		}

		var onSubscopeLoad = function(container) {			
			switch(self.selectedScopeLevel()) {
				case 'national':
				if(!localStorage.getItem('nationalListContainer')) {
					localStorage.setItem('nationalListContainer', JSON.stringify(ko.toJS(container)));	
				} 
				break;
			}
		}
	
		self.submitSearch = function() {
			var params = {
				scope: self.selectedScope(),
				subscope: self.selectedSubscope(),
				exchange: self.selectedTypeOfExchange(),
				start: self.startDuration(),
				end: self.endDuration()
			};

			api.searchDemand(params, self.searchResults);
		}

		self.selectedScope.subscribe(onScopeChange);
		self.searchSubscopeOptions.subscribe(onSubscopeLoad);

		self.init = function() {
			self.selectedTypeOfExchange(self.typeOfInternship()[0]);
			self.selectedScope(self.searchScopeOptions()[0]);
			return self;
		}

		return self.init();
		}

	return aiesec;
})(aiesec);