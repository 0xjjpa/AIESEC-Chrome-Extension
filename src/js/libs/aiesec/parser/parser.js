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
			var dom = $('<html>').html(html);
			var parsedObject = {};
			$.each(dom.find('select option'), function(i, v) {
				parsedObject[$(v).val()] = $(v).html();
			});
			return parsedObject;
		}

		self.parseNationalList = function(html) {
			var dom = $('<html>').html(html);
			var parsedResult = [];
			$.each(dom.find('select option'), function(i, v) {
				parsedResult[i] = { scopeValue: $(v).val(), name: $(v).html() };	
			})
			parsedResult.splice(0,1);
			return parsedResult;
		}


		self.getAreasList = function(html) {
			var dom = $('<html>').html(html);
			
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
		* @param {String} scriptHtml The script inside every MyAIESEC page that contains the logged in information
		* @return {Object}
		**/
		self.getProfile = function(scriptHtml) {
			/*
			* Here's our main regular expression; it uses 2 grouping classes, one after support and one after value.
			* Example: document.getElementById('support_username').value='me@jjperezaguinaga.com';
			* Our regex matches 3 groups:
			* a) The entire match (duh)
			* b) "username"
			* c) "me@jjperezaguinaga.com"
			*/
			var regex = /document.getElementById\('support_([^\']+)'\)\.value='([^\']+)';/g;

			var match;

			// We find this match multiple times in the html, but we only need the first 8
			for(var i = 0; i < 8; i++) {
				match = regex.exec(scriptHtml);
				console.log(match);
			}
		}

		return self;
	}

	return aiesec;
})(aiesec)