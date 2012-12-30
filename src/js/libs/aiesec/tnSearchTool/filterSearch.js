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
		var SEARCH_RESULTS_KEY = "searchResults";

		var SearchResultCollection = function(id, timestamp, searchResults, categories, results) {
			var self = {};

			self.id = id; 
			self.timestamp = timestamp;
			self.searchResults = searchResults;
			self.categories = categories;
			self.results = results;

			self.dateToString = (function() {
				return self.timestamp.toLocaleDateString();
			})();

			self.categoriesToString = (function() {
				return self.categories + " Categories";
			})();

			self.resultsToString = (function() {
				return self.results + " Results";
			})();

			return self;
		}

		self.savedSearchResults = ko.observableArray([]);
		self.searchResults = ko.observableArray([]);

		self.loadSearchCollections = function() {
			chrome.storage.local.get( SEARCH_RESULTS_KEY, function(ResultsHashMap) {
				
				if(!ResultsHashMap) {
					console.log("Empty saved results");
				} else {
					var searchResultsObject = ResultsHashMap[SEARCH_RESULTS_KEY];
					var resultsArray = [];
					for (var key in searchResultsObject) {
						if(searchResultsObject.hasOwnProperty(key)) {
							var resultLightObject = searchResultsObject[key];
							console.log(resultLightObject);
							//We ensure only proper formatted objects get into the array.
							if(resultLightObject.timestamp) {
								resultsArray.unshift(resultLightObject);
							}
						}
					}
					self.savedSearchResults(resultsArray);
				}
        	});		
		}

		self.searchResults.subscribe(function(value) {
			if(value.length > 0) {
				self.emptyResults(false);

				//We are going to save that specific search
				var categories = 0;
				var results = 0;

				$.map(value, function(searchResult) {
					categories++;
					results += parseInt(searchResult.count, 10);
				});

				var timestamp = new Date();				
				var unixTimestamp = Math.round(timestamp.getTime() / 1000);

				var searchObject = new SearchResultCollection(unixTimestamp, timestamp, value, categories, results);

				chrome.storage.local.get( SEARCH_RESULTS_KEY, function(ResultsHashMap) {
					console.log(ResultsHashMap);
        			if(!ResultsHashMap[SEARCH_RESULTS_KEY]) {
        				// First time, we need to ensure there's a map to hold our results.
        				ResultsHashMap = {};
        				ResultsHashMap[SEARCH_RESULTS_KEY]= {};
        			}
        			console.log(ResultsHashMap);
        			var searchResultsObject = ResultsHashMap[SEARCH_RESULTS_KEY];
        			console.log(searchResultsObject);
        			// We add our new id to our search Results hashmap and a light weight version of the Search Object
        			searchResultsObject[unixTimestamp] = {
        				categories: searchObject.categoriesToString, 
        				results: searchObject.resultsToString,
        				timestamp: searchObject.dateToString
        			};
        			

        			var ResultHashMapObject = {};
        			ResultHashMapObject[SEARCH_RESULTS_KEY] = searchResultsObject;
        			console.log(ResultHashMapObject)
        			// We set the map into the chrome storage
        			chrome.storage.local.set( ResultHashMapObject, function() { 

        				//We updated the hash map successfully, time to add our entire object to the storage.
        				self.loadSearchCollections();
        				console.log("Updated searchResults map successfully");

        				var ResultObject = {}
        				ResultObject[searchObject.id] = searchObject;

        				console.log(ResultObject);
        				chrome.storage.local.set( ResultObject, function() {

        					// We added our entire object to a local storage sucessfully
        					console.log("Updated searchObject successfully");
        				});
					});
    			});				
			};
		});

		self.isLoading = ko.observable(false);
		self.emptyResults = ko.observable(true);
		self.firstSearch = ko.observable(true);

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
			self.isLoading(true);
			api.searchDemand(params, self.searchResults);
		}

		self.selectedScope.subscribe(onScopeChange);
		self.searchSubscopeOptions.subscribe(onSubscopeLoad);

		self.init = function() {
			self.selectedTypeOfExchange(self.typeOfInternship()[0]);
			self.selectedScope(self.searchScopeOptions()[0]);
			self.loadSearchCollections();
			return self;
		}

		return self.init();
		}

	return aiesec;
})(aiesec);