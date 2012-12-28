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

		self.parseObjectNationalList = function(html) {
			var dom = $('<html>').html(html); // Warning, will eval any content
			var parsedObject = {};
			$.each(dom.find('select option'), function(i, v) {
				parsedObject[$(v).val()] = $(v).html();
			});
			return parsedObject;
		}

		self.parseNationalList = function(html) {
			var dom = $('<html>').html(html); // Warning, will eval any content
			var parsedResult = [];
			$.each(dom.find('select option'), function(i, v) {
				parsedResult[i] = { scopeValue: $(v).val(), name: $(v).html() };	
			})
			parsedResult.splice(0,1);
			return parsedResult;
		}


		self.getAreasList = function(html) {
			var dom = $('<html>').html(html); // Warning, will eval any content
			
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