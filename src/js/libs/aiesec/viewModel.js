/**
* Module for aiesec applications
* @module aiesec
**/

var aiesec = (function(aiesec, undefined) { 
	var aiesec = aiesec || {};
	
	/**
	* The wrapper for the Components section.
	* @class navComponent
	* @constructor
	* @namespace aiesec
	* @chainable
	* @param {String} name Title for the Component
	* @param {String} id Unique id to select the correct template on runtime.
	*/
	aiesec.component = function(name, id, libraryName) {
		var self = {};		
		self.name = ko.observable(name);
		self.id = ko.observable(id);
		self.core = ko.observable({});
		
		self.init = function() {
			if(typeof libraryName !== "undefined" && aiesec.hasOwnProperty(libraryName)) {				
				self.core(new aiesec[libraryName]);	
			}
			return self;			
		}
		return self.init();					
	}

	aiesec.menu = function() {
		var self = {};

		self.components = ko.observableArray(
			[
				new aiesec.component('Home', 'aiesec_home'),
				new aiesec.component('TN Search Tool', 'aiesec_tn_search_tool', 'bootstrapSearchTn'),
			]
		);		

		return self;
	}

	/**
	* Navigation View Model
	* @class navigation
	* @constructor
	* @namespace aiesec
	* @chainable
	*/
	aiesec.viewModel = function() {
		var self = {};

		self.menu = ko.observable({});
		self.component = ko.observable({});

		self.init = function() {
			self.menu(new aiesec.menu());			
			self.component(self.menu().components()[0]);			
			return self;
		}

		self.loadComponent = function(component) {				
			self.component(component);
			return true;
		}

		return self.init();
	}


	return aiesec;
})(aiesec);