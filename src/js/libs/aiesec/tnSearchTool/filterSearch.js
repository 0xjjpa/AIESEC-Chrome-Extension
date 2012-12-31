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

		var scopesDictionary = {1: "AIESEC International", 2: "Region", 3: "Country"};
		var scopesArray = [{name:"AIESEC International", scopeValue: 1},{name: "Region", scopeValue: 2}, {name:"Country", scopeValue: 3}];

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

		self.clearSavedSearches = function() {
			chrome.storage.local.clear();
			self.loadSearchCollections();
		}

		self.loadSavedSearchResult = function(savedResult) {
			chrome.storage.local.get( savedResult.id+"", function(savedResultHashObject) {
				var savedResultObject = savedResultHashObject[savedResult.id];
				self.isLoading(true);
				self.searchResults([]);
				self.wasLoadedFromSearch(true);
				self.currentSearch("> "+savedResultObject.dateToString);
				self.searchParams(savedResult.params);
				self.searchResults(savedResultObject.searchResults);
			});
		}

		self.deleteSavedSearchResult = function(savedResult) {

			chrome.storage.local.get( SEARCH_RESULTS_KEY, function(ResultsHashMap) {
				if(!ResultsHashMap[SEARCH_RESULTS_KEY]) {
        			// First time, we need to ensure there's a map to hold our results.
        			ResultsHashMap = {};
        			ResultsHashMap[SEARCH_RESULTS_KEY]= {};
        		}
        		// We try to delete the entry given through the id (unixtimestamp)
        		var searchResultsObject = ResultsHashMap[SEARCH_RESULTS_KEY];
        		delete searchResultsObject[savedResult.id];

        		var ResultHashMapObject = {};
        		ResultHashMapObject[SEARCH_RESULTS_KEY] = searchResultsObject;

        		chrome.storage.local.set( ResultHashMapObject, function() { 

        				//We updated the hash map successfully, time to add our entire object to the storage.
        				self.loadSearchCollections();

        				//We remove the actual object from the storage
        				chrome.storage.local.remove(savedResult.id, function() {
        					console.log("Removed successfully");
        				});
				});

			});
		}

		self.savedSearchResults = ko.observableArray([]);
		self.wasLoadedFromSearch = ko.observable(false);

		self.searchResults = ko.observableArray([]);
		self.currentSearch = ko.observable("");

		self.backgroundResults = ko.observableArray([]);

		self.backgroundResults.subscribe(function(value){
			console.log(value);
		})

		self.loadBackground = function(searchResult) {
			var searchParams = self.searchParams();

			var params = {
				start: searchParams.start,
				end: searchParams.end,
				exchange: searchParams.exchange,
				scope: searchParams.scope,
				subscope: searchParams.subscope,
				backgroundId: searchResult.id,
				backgroundName: searchResult.name
			};
			
			api.searchBackground(params, self.backgroundResults);
		}

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
			self.firstSearch(false);
			if(self.wasLoadedFromSearch()) {
				self.wasLoadedFromSearch(false);				
				self.emptyResults(false);
			} else if(value.length > 0) {
				self.emptyResults(false);

				var params = self.searchParams();
				var searchScope = scopesDictionary[params.scope];

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

				self.currentSearch("> "+searchObject.dateToString);

				chrome.storage.local.get( SEARCH_RESULTS_KEY, function(ResultsHashMap) {
					
        			if(!ResultsHashMap[SEARCH_RESULTS_KEY]) {
        				// First time, we need to ensure there's a map to hold our results.
        				ResultsHashMap = {};
        				ResultsHashMap[SEARCH_RESULTS_KEY]= {};
        			}
        			
        			var searchResultsObject = ResultsHashMap[SEARCH_RESULTS_KEY];
        			
        			// We add our new id to our search Results hashmap and a light weight version of the Search Object
        			searchResultsObject[unixTimestamp] = {
        				params: params,
        				searchScope: searchScope,
        				categories: searchObject.categoriesToString, 
        				results: searchObject.resultsToString,
        				timestamp: searchObject.dateToString,
        				id: unixTimestamp
        			};
        			

        			var ResultHashMapObject = {};
        			ResultHashMapObject[SEARCH_RESULTS_KEY] = searchResultsObject;
        			
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
			} else {
				self.emptyResults(true);
				self.isLoading(false);
			}
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
		
		self.searchScopeOptions = ko.observableArray(scopesArray); // Country Scope value is 3

		self.selectedScope = ko.observable();
		self.selectedScopeLevel = ko.observable();
		self.selectedScopeHasSubscope = ko.observable();

		self.searchSubscopeOptions = ko.observableArray();
		self.selectedSubscope = ko.observable();

		var onScopeChange = function(scopeValue) {
			switch(scopeValue) {
				case 1: //International id provided by MyAIESEC
				self.selectedScopeLevel('international');
				self.selectedSubscope(13426545);
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

		self.searchParams = ko.observable();
	
		self.submitSearch = function() {
			self.searchResults([]); // Empty results to show loading;
			self.isLoading(true);			
			var params = {
				scope: self.selectedScope(),
				subscope: self.selectedSubscope(),
				exchange: self.selectedTypeOfExchange(),
				start: self.startDuration(),
				end: self.endDuration()
			};
			self.searchParams(params);
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