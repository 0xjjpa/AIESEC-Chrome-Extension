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

		self.parseTN = function(html) {
			// We ensure javascript is not executed
			var dom = document.createElement('div');
			dom.innerHTML = html;
			$(dom).find('script').remove();

			var rows = $(dom).find('div.container div.left-content.box tr');
			var TN = {};

			// Here's where we "guess" which row is each value...
			$.each(rows, function(i,v){
				var row = $(v);
				var key;
				var alreadyAdded = false;
				var requiresTrim = false;

				var backgroundIndexHR = 32; 

				if(i == 0) { //Company full name, position and location
					var fonts = row.find("td font");
					$.each(fonts, function(j, w) {
						var font = $(w);
						var key2;
						if (j == 0) { // Company full name
							key2 = "fullname";
						} else if (j == 1) {
							font = font.find("b"); // Job title
							key2 = "position";
						} else if (j == 2) {
							key2 = "location"; // Internship location
						}

						if(key2) {
							TN[key2] = font.html();
							alreadyAdded = true;
						}
					});
				} else if(i == 1) { // Start and End date (as text nodes.... o_O)
					var dateTextNodes = $(row.find("td")[0]).contents().filter(
						function() {
							return this.nodeType == Node.TEXT_NODE;
					});

					TN["datesTest"] = dateTextNodes.html();
					alreadyAdded = true;

					/*
					$.each(dateTextNodes, function(j, w) {
						var dateTextNode = $(w);
						var key2;
						if (j == 0) {
							key2 = "startDate";
						} else if( j == 1) {
							key2 = "endDate";
						}

						if(key2) {
							TN[key2] = dateTextNode.html();
							alreadyAdded = true;
						}
					});
					*/
				} else if (i == 4) { // About the company
					row = row.find("td");
					key = "about";
				} else if (i == 7) { // Department
					row = $(row.find("td")[1]);
					key = "department";
				} else if (i == 8) { // Job descriptions [1-6]
					row = $(row.find("td")[1]);
					key = "description";
				} else if (i == 9) {
					row = $(row.find("td")[1]);
					key = "description2";
				} else if (i == 10) {
					row = $(row.find("td")[1]);
					key = "description3";
				} else if (i == 11) {
					row = $(row.find("td")[1]);
					key = "description4";
				} else if (i == 12) {
					row = $(row.find("td")[1]);
					key = "description5";
				} else if (i == 13) {
					row = $(row.find("td")[1]);
					key = "description6";
				} else if (i == 14) { // Expectations or Results
					row = $(row.find("td")[1]);
					key = "expectations";
				} else if (i == 15) { // Preparations
					row = $(row.find("td")[1]);
					key = "preparations";
				} else if (i == 16) { // Working conditions
					row = $(row.find("td")[1]);
					key = "workConditions";
					requiresTrim = true;
				} else if (i == 17) { // Other details
					row = $(row.find("td")[1]);
					key = "extraDetails";
				} else if (i == 18) { // Learning points
					row = $(row.find("td")[1]);
					key = "learningExperience";
				} else if (i == 19) { // Additional information
					row = $(row.find("td")[1]);
					key = "additionalInfo";
				} else if (i == 22) { // Field of Work
					row = $(row.find("td")[1]);
					key = "field";
				} else if (i == 23) { // Working Hours
					row = $(row.find("td")[1]);
					key = "schedule";
					requiresTrim = true;
				} else if (i == 24) { // Salary
					row = $(row.find("td")[1]);
					key = "salary";
				} else if (i == 27) { // Preferred Date to start
					row = $(row.find("td")[1]);
					key = "earliestStartDate";
					requiresTrim = true;
				} else if (i == 28) { // Preferred Latest date to end
					row = $(row.find("td")[1]);
					key = "latestEndDate";
					requiresTrim = true;
				} else if (i == 29) { // Minimum Duration
					row = $(row.find("td")[1]);
					key = "minimumDuration";
					requiresTrim = true;
				} else if (i == 30) { // Maximum Duration
					row = $(row.find("td")[1]);
					key = "maximumDuration";
					requiresTrim = true;
				} else if (i == 31) { // Degree
					row = $(row.find("td")[1]);
					key = "degree";
					requiresTrim = true;
				} else if (i >= 32) { // BACKGROUND HR 
					// So the backgrounds are generated dinamically, so we need to find
					// the length of the total backgrounds before going further. We use
					// a flag on the HR lines to mark the start and end
					/*
					row = $(row.find("td"));
					if (row.length)
					*/
				} 

				if(key && !alreadyAdded) {
					if (requiresTrim) {
						TN[key] = ($.trim(row.html())).replace(/[\n\r]/g, ' ');	
					} else {
						TN[key] = row.html();
					}
					
				}
			});

			return TN;	
		}

		self.parseTNSummary = function(html) {
			// We ensure javascript is not executed
			var dom = document.createElement('div');
			dom.innerHTML = html;
			$(dom).find('script').remove();

			var rows = $(dom).find('div.container div.left-content.box tr');
			var TN = {};

			// Here's where we "guess" which row is each value...
			$.each(rows, function(i,v){
				var row = $(v);
				var key;
				if(i == 4) { // About the company
					row = row.find("td");
					key = "about";
				} else if (i == 7){ // Department
					row = $(row.find("td")[1]);
					key = "department";
				} else  if (i == 8) {
					row = $(row.find("td")[1]);
					key = "description";
				}

				if(key)	TN[key] = row.html();
			});

			return TN;
		}

		self.parseBackgroundResults = function(html) {
			// We ensure javascript is not executed
			var dom = document.createElement('div');
			dom.innerHTML = html;
			$(dom).find('script').remove();

			// All the rows in the page with a bgcolor (results)
			var rows = $(dom).find("tr[bgcolor^='#F']");


			var parsedArray = [];
			$.each(rows, function(i,v){
				var row = $(v);
				var cells = $(row).find("td");
				var TN = {};
				// Here's where we "guess" which row is each value...
				$.each(cells, function(j, w) {					
					var cell = $(w);
					var key;
					if(j == 0){
						cell = cell.find("a");
						key = "id";
					}

					else if(j == 1) {
						key = "organization";
					}

					else if(j == 2) {
						key = "committee";
					}

					else if(j == 3) {
						key = "country";
					}

					else {
						key = "date";
					}

					if(key) TN[key] = cell.html();

					//Special case, actual database ID + Structure for binding
					if(j == 0) {
						var attr = cell.attr("onclick");
						var regex = /viewTN\('([^\']+)'\)/g;
						var match = regex.exec(attr);
						if (match) {
							var databaseId = match[1];
						}
						TN["databaseId"] = databaseId;
						TN["tnSummary"] = {
							about: "",
							department: "",
							description: ""
						};
					};
				});
				parsedArray.push(TN);
			});
			return parsedArray;
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
				parsedArray[i] = {
					id: resultId, 
					name: resultName, 
					count: $(anchorWithCount).text(), 
					showBackgroundResults: false,
					backgroundResults: [],
					containerClass: ""
				};
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