/**
* API that communicates with the MyAIESEC BackEnd to retrieve values
* @module aiesec
**/

var aiesec = (function(aiesec, undefined) {
	var aiesec = aiesec || {};

	/**
	* Wrapper for API Methods
	* @constructor
	* @class api
	* @namespace aiesec
	* @chainable
	*/
	aiesec.api = function() {
		var self = {};

		/**
		* An object with the parameters required for MyAIESEC to query the regional Lists.
		* @property regionalLookUp
		* @type {Object}		
		*/
		var regionalLookUp = {
			operation: "regionalList",
			isRoleBased:false,
			isRightMenu:false,
			alumniHome:false,
			committeeName:"cmtId",
			allRequired:false,
			isAllCheckReq:false,
			isInactiveCommitteeReq:false,
			isReport:false,
			allCheckBox:false,
			gnFlag:1,
			mcFlag:1,
			passFlag:0
		}

		/**
		* An object with the parameters required for MyAIESEC to query the national Lists.
		* @property nationalLookUp
		* @type {Object}		
		*/
		var nationalLookUp = {
			operation:"nationalList",
			isRoleBased:false,
			isRightMenu:false,
			alumniHome:false,
			committeeName:"cmtId",
			allRequired:false,
			isAllCheckReq:false,
			isInactiveCommitteeReq:false,
			isReport:false,
			allCheckBox:false,
			gnFlag:1,
			mcFlag:1,
			passFlag:0
		}

		self.getNationalList = function(container) {
			var params = {
				url: "http://www.myaiesec.net/exchange/contentscope.do",
				data: nationalLookUp,
				type: "GET"				
			}

			var request = {command: "getNationalList", params: params};
			self.request(request, container);
		}

		self.request = function(request, container) {
			chrome.tabs.getSelected(null, function(tab) {
				chrome.tabs.sendMessage(tab.id, request, function(response) {					
					console.log(response);											
				});					
			});
		}

		return self;
	}

	return aiesec;
})(aiesec)