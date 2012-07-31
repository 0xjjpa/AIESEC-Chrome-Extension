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

		self.parseNationalList = function(html) {
			var dom = $('<html>').html(html);
			var parsedResult = [];
			$.each(dom.find('select option'), function(i, v) {
				parsedResult[i] = { id: $(v).val(), name: $(v).html() };			
			})
			return parsedResult;
		}		

		return self;
	}

	return aiesec;
})(aiesec)