/**
* Module for aiesec applications
* @module aiesec
**/

var aiesec = (function(aiesec, undefined) {
	var aiesec = aiesec || {};

	/**
	* Parser that parses the content outputted from MyAIESEC into js objects
	* @constructor
	* @class parser
	* @namespace aiesec
	* @chainable
	*/
	aiesec.parser = function() {
		var self = {};
		var $ = jQuery;

		self.parseBackgroundResults = function(html) {
			// We ensure javascript is not executed
			var dom = document.createElement('div');
			dom.innerHTML = html;
			$(dom).find('script').remove();

			console.log($(dom).text());
		}

		self.parseDemandResults = function(html) {
			// We ensure javascript is not executed
			var dom = document.createElement('div');
			dom.innerHTML = html;
			$(dom).find('script').remove();

			// Object to return with result
			var parsedArray = [];
			
			// Containers with the results
			var pageTables = $(dom).find(".tableClass");

			// The results are located in the first one
			var searchResults = $(pageTables[1]);
			// We remove the first one, as it's the header
			var searchRows = searchResults.find("tr").filter(function(i) { return i > 1 }); 

			$.each(searchRows, function(i, v) {
				var row = $(v); // The row that contains the result search
				var cells = $(v).find("td"); // The actual table cells
				var anchorWithName = $(cells[0]).find("a"); // The anchor with the information of the search id and name
				var anchorWithCount = $(cells[1]).find("a"); // The anchor with the information of the amount of searchs

				var attr = $(anchorWithName).attr("onclick");
				var regex = /viewBgrPopupTN\('([^\']+)','([^\']+)'\)/g; // We are going to retrieve the onClick attr and obtain name and ID

				var match = regex.exec(attr);
				if (match) {
					var resultId = match[1];
					var resultName = match[2];
				}
				parsedArray[i] = {id: resultId, name: resultName, count: $(anchorWithCount).text()};
			})

			return parsedArray;
		}

		self.parseObjectNationalList = function(html) {
			// We ensure javascript is not executed
			var dom = document.createElement('div');
			dom.innerHTML = html;
			$(dom).find('script').remove();

			dom = $(dom);
			var parsedObject = {};
			$.each(dom.find('select option'), function(i, v) {
				parsedObject[$(v).val()] = $(v).html();
			});
			return parsedObject;
		}

		self.parseNationalList = function(html) {
			// We ensure javascript is not executed
			var dom = document.createElement('div');
			dom.innerHTML = html;
			$(dom).find('script').remove();

			dom = $(dom);

			var parsedResult = [];
			$.each(dom.find('select option'), function(i, v) {
				parsedResult[i] = { scopeValue: $(v).val(), name: $(v).html() };	
			})
			parsedResult.splice(0,1);
			return parsedResult;
		}


		self.getAreasList = function(html) {
			// We ensure javascript is not executed
			var dom = document.createElement('div');
			dom.innerHTML = html;
			$(dom).find('script').remove();

			dom = $(dom);
			
			var areasTable = dom.find('table.tableClass')[1];
			var areasList = $(areasTable).find('tr').filter(function(index) { return index != 0 })
			var r =  /'[^']+'/g; 

			var td, a, onClickProperty, m;
			var areasContainer = [];
			$.each(areasList, function(i, v) { 
				td = $(v).find('td')[1]; 
				a = $(td).find('a'); 
				onClickProperty = a.attr('onclick'); 
				m = onClickProperty.match(r); 
				areasContainer[i] = {count: parseInt(a.html()), id: m[0].replace(/['"]/g,''), label: m[1].replace(/['"]/g,'')}
			})
			console.log(areasContainer);
		}

		/**
		* Retrieves the current logged in information inside the webpage. This is our main mechanism to know whether someone is connected or not.
		* @method getProfile
		* @param {String} html The landing MyAIESEC page that contains the logged in information
		* @return {Object}
		**/
		self.getProfile = function(html) {
			/*
			* Warning! Instead of a plaing html, we are retrieving an entire page that has script tags in it.
			* By parsing it inside a html object, we are running any script inside.
			* So instead of

			var dom = $('<html>').html(html);
			var contentScript = dom.find("script[src='/scripts/common.js']").next().html();

			* We are going to just use the html as plain string and regex all of it.
			*/
			
			contentScript = html;

			/*
			* Here's our main regular expression; it uses 2 grouping classes, one after support and one after value.
			* See stagehome.do source code and "Find" support_username to see where I'm retrieving the info from.
			* Example: document.getElementById('support_username').value='me@jjperezaguinaga.com';
			* Our regex matches 3 groups:
			* a) The entire match (duh)
			* b) "username"
			* c) "me@jjperezaguinaga.com"
			*/
			var regex = /document.getElementById\('support_([^\']+)'\)\.value='([^\']+)';/g;

			var match;
			var profile = {}
			// We find this match multiple times in the html, but we only need the first 8
			for(var i = 0; i < 8; i++) {
				match = regex.exec(contentScript);
				// Showtime! If we don't have a match, it means that we are not logged in, return empty object!
				if (match) {
					profile[match[1]] = match[2];	
				} else {
					return undefined;
				}
			}

			var regexImage = /displayAvatar.do\?friendid=(\d+)/g
			match = regexImage.exec(contentScript);
			if (match) {
				profile.friendid = match[1];
			}

			return profile;
		}

		return self;
	}

	return aiesec;
})(aiesec)