/**
* AIESEC Chrome Extension Background Logic Javascript Library.
* @module Aiesec Background Page
* @class aiesec
**/
var aiesec = (function(aiesec, undefined) {
	var a = aiesec || {};

	/**
	* Regular Expression that matches the URL to the MyAIESEC Portal
	* @property regexAIESEC
	* @type {RegExp}
	* @private
	* @default /http:\/\/www.myaiesec.net\//
	**/
	var regexAIESEC = new RegExp(/http:\/\/www.myaiesec.net\//);

	/**
	* Listener for Displaying the Extension Page Action when the Tab is updated.
	* @private
	* @event displayPageAction
	* @param {Number} tabId The tabId given by the tabs listener to know which tab was updated.
	* @param {Object} changeInfo The current status of the tab.
	* @param {Object} tab The metadata of the tab.
	**/
	var displayPageAction = function (tabId, changeInfo, tab) {
		var match = regexAIESEC.exec(tab.url); // var regexAIESEC = new RegExp(/http:\/\/www.myaiesec.net\//);
		// We only display the Page Action if we are inside a MyAIESEC Tab.
		if(match && changeInfo.status == 'complete') {
			//We send the proper information to the content script to render our app.
			 chrome.tabs.sendMessage(tab.id, {load: true}, function(response) {
			 	if(response) {
			 		console.log("Inside Background Response script, reading content response:");
			 		console.log(response);
			 		//After successfully getting the response, we show the Page Action Icon.
    				chrome.pageAction.show(tab.id);		
			 	}
  			});
		}
	};

	var messageListener = function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    if (request.greeting == "hello")
      sendResponse({farewell: "goodbye"});
  	}

	/**
	* AIESEC Module Init Constructor for Background Page Logic. Sets up Chrome Listener for Background Page.
	* @method init
	* @chainable
	* @return {Object} Instance of Aiesec Class
	**/
	a.init = function() {
		chrome.tabs.onUpdated.addListener(displayPageAction);
		chrome.extension.onMessage.addListener(messageListener);
		return a;
	};

	/**
	* Library that holds the logic of the Background Page
	* @class backgroundPageController
	* @constructor
	**/
	a.backgroundPageController = function() {
		var pg = {};

		/**
		* Callback function that loads received content from a Message Listener
		* @private
		* @event loadPopupContent
		* @param {Object} event
		**/
		var loadPopupContent = function(event) {
			console.log(event);
			console.log("Background Received Signal to Set up Popup");
		};

		/**
		* Chrome Extension Bootstrap for Popup. Loads logic from Sandboxed HTML for eval-safe use into Popup.
		* @event loadBoostrap
		* @namespace backgroundPageController
		**/
		pg.loadBootstrap = function() {
			var iframe = document.getElementById("aiesec-frame");
			var data = {
				command: "render"
			};

			iframe.contentWindow.postMessage(data, "*");
		};

		/**
		* Background Page Init Constructor. Sets up the Background Page Window Listener for the Message Event
		* @method init
		* @chainable
		* @return {Object} Instance of Background Page Controller Class
		**/
		pg.init = function() {
			window.addEventListener('message', loadPopupContent);
			return pg;
		};

		return pg.init();
	};

	return a.init();
})(aiesec);