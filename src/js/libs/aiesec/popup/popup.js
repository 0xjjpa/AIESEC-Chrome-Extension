var aiesec = (function(aiesec, undefined) {
	var a = aiesec || {};

	/**
	* Library that helps to manage the communication between the Chrome.PageAction Popup and Background Page
	* @class popupController
	* @chainable
	* @namespace aiesec
	* @constructor
	**/
	a.popupController = function() {
		var backgroundWindow = chrome.extension.getBackgroundPage();
		console.log(backgroundWindow);
	};


	return a;
})(aiesec);

