/**
* AIESEC Chrome Extension Application View Model
* @module Aiesec View Model
* @class aiesec
**/
var aiesec = (function(aiesec, undefined) {
	var a = aiesec || {};
	
	


	/**
	* Wraps the logic for each component and bootraps a given library on runtime.
	* @class component
	* @constructor
	* @param {String} name Title for the Component
	* @param {String} templateName Unique name to select the correct template on runtime.
	* @param {String} libraryName Specific library to run inside of the AIESEC core.
	**/
	a.component = function(name, id, templateName, libraryName, cssId) {
		var self = {};
		self.name = ko.observable(name);
		self.id = ko.observable(id);
		self.templateName = ko.observable(templateName);
		self.cssId = ko.observable(cssId);
		self.core = ko.observable({});

		self.selectedTemplate = function() {
			return self.templateName();
		}
		
		self.init = function() {
			if(typeof libraryName !== "undefined" && aiesec.hasOwnProperty(libraryName)) {
				self.core(new aiesec[libraryName]());
			}
			return self;
		};
		return self.init();
	};

	/**
	* Menu component that shows the navigation for the AIESEC module.
	* @class menu
	* @constructor
	**/
	a.menu = function() {
		var self = {};

		self.components = ko.observableArray(
			[
				new aiesec.component('Home', 'aiesec_home', 'aiesecTemplate'),
				new aiesec.component('TN Search Tool', 'aiesec_tn_search_tool', 'bootstrapSearchTNtemplate', 'bootstrapSearchTn', 'aiesec-search-tn'),
				new aiesec.component('TN Monitor Tool', 'aiesec_tn_monitor_tool', 'bootstrapMonitorTNtemplate', 'bootstrapMonitorTn', 'aiesec-monitor-tn')
			]
		);
		return self;
	};

	/**
	* Application View Model that structs both the menu and the component
	* @class viewModel
	* @constructor
	**/
	a.viewModel = function() {
		var self = {};

		self.profile = ko.observable({});
		self.menu = ko.observable({});
		self.component = ko.observable({});

		self.loadProfile = function() {
			var backgroundWindow = chrome.extension.getBackgroundPage();
			self.profile(backgroundWindow.aiesec.profileObject.JSONObject);
		}

		self.init = function() {
			self.loadProfile();
			self.menu(new aiesec.menu());
			self.component(self.menu().components()[0]);
			return self;
		};

		self.loadComponent = function(component) {
			self.component(component);
			$("select").chosen();
			return true;
		};

		return self.init();
	};


	return a;
})(aiesec);