/**
* @author jjperezaguinaga
**/

var aiesec = (function(aiesec, undefined) {
	var a = aiesec || {};

	/**
	* API that communicates with the MyAIESEC BackEnd to retrieve values. Wrapper for API Methods
	* @constructor
	* @class api
	* @namespace aiesec
	* @chainable
	*/
	a.api = function() {
		var self = {};

		/**
		* An array with the possible areas to pick TN's for (up to date at 05/08/2012)
		* @property areas
		* @type {Array}
		*/
		var areas = [{"count":"2961","id":"101","label":"Social Work"},{"count":"2395","id":"117","label":"Child (Youth) Education"},{"count":"2168","id":"14","label":"Project Management"},{"count":"1877","id":"106","label":"Introductory Cultural Education"},{"count":"1854","id":"98","label":"Bilingual and Cross Cultural Education"},{"count":"1693","id":"66","label":"Introductory Teaching"},{"count":"1432","id":"118","label":"Foreign Languages Education"},{"count":"1389","id":"108","label":"International Education"},{"count":"1258","id":"92","label":"Training and Development"},{"count":"1241","id":"39","label":"Linguistics"},{"count":"1128","id":"119","label":"Subjects Education"},{"count":"1087","id":"40","label":"Advertising + Public Relations"},{"count":"1026","id":"84","label":"Event Management"},{"count":"1001","id":"42","label":"Market Research & Evaluation"},{"count":"975","id":"122","label":"Development Studies"},{"count":"953","id":"107","label":"Advanced Cultural Education"},{"count":"891","id":"102","label":"Psychology"},{"count":"872","id":"45","label":"Introductory Marketing"},{"count":"849","id":"44","label":"International Marketing"},{"count":"841","id":"93","label":"Web Development and Management"},{"count":"825","id":"67","label":"Advanced Teaching"},{"count":"729","id":"19","label":"Software Development and Programming"},{"count":"724","id":"103","label":"Counselling and Guidance"},{"count":"697","id":"100","label":"Sociology"},{"count":"677","id":"95","label":"Database Management"},{"count":"675","id":"12","label":"Organisation Management + Planning"},{"count":"582","id":"47","label":"Retail + Sales Marketing"},{"count":"561","id":"41","label":"Consumer + Buyer Behaviour"},{"count":"468","id":"137","label":"Public Relations"},{"count":"466","id":"163","label":"Arts"},{"count":"465","id":"22","label":"Systems Analysis and Design"},{"count":"431","id":"10","label":"Introduction to Management / Business Administration"},{"count":"360","id":"150","label":"Environmental Protection"},{"count":"360","id":"46","label":"Product Planning, Development & Control"},{"count":"344","id":"83","label":"Corporate Community Engagement"},{"count":"332","id":"94","label":"Network Management & Data Transmission"},{"count":"330","id":"121","label":"Customer Relationship Management"},{"count":"319","id":"91","label":"Organisational Behaviour"},{"count":"318","id":"135","label":"Introduction to Communications"},{"count":"317","id":"175","label":"Tourism"},{"count":"307","id":"9","label":"International Management"},{"count":"290","id":"7","label":"Hotel + Restaurant Management"},{"count":"284","id":"136","label":"Journalism"},{"count":"282","id":"4","label":"Introductory accounting"},{"count":"277","id":"43","label":"Import & Export"},{"count":"276","id":"165","label":"Graphic Design"},{"count":"238","id":"3","label":"Financial accounting"},{"count":"231","id":"33","label":"Financial Planning + Budgeting"},{"count":"223","id":"34","label":"Introductory Finance"},{"count":"212","id":"1","label":"Auditing"},{"count":"210","id":"88","label":"Personal Evaluation"},{"count":"202","id":"24","label":"Developmental Economics"},{"count":"186","id":"149","label":"Ecology"},{"count":"173","id":"26","label":"Introductory Economics"},{"count":"166","id":"13","label":"Introductory HR management"},{"count":"165","id":"156","label":"Medicine & Healthcare"},{"count":"160","id":"89","label":"Advanced HR management"},{"count":"157","id":"63","label":"Introductory Development Studies"},{"count":"145","id":"87","label":"Recruitment and Allocation"},{"count":"132","id":"81","label":"Social & Ethical Editing + Reporting"},{"count":"129","id":"32","label":"Banking"},{"count":"128","id":"143","label":"Introductory Law"},{"count":"127","id":"120","label":"Brand & Trademark Management"},{"count":"117","id":"132","label":"Mechanical Engineering"},{"count":"110","id":"5","label":"Managerial accounting"},{"count":"98","id":"31","label":"Economic Research + Forecasting"},{"count":"95","id":"110","label":"Advanced Education"},{"count":"92","id":"29","label":"Microeconomics"},{"count":"91","id":"2","label":"Cost accounting"},{"count":"90","id":"86","label":"International Resource Management"},{"count":"89","id":"27","label":"Macroeconomics"},{"count":"88","id":"8","label":"Industrial Management"},{"count":"85","id":"25","label":"Environmental Economics"},{"count":"85","id":"130","label":"Industrial Engineering"},{"count":"80","id":"36","label":"International Financial Management"},{"count":"80","id":"85","label":"Statistics"},{"count":"76","id":"23","label":"International Trade + Balance of Payment"},{"count":"74","id":"115","label":"Mobile Applications"},{"count":"73","id":"16","label":"Transportation / Distribution Management"},{"count":"65","id":"128","label":"Electronics Engineering"},{"count":"63","id":"112","label":"Crisis Management"},{"count":"63","id":"131","label":"Introductory Engineering"},{"count":"62","id":"129","label":"Environmental Engineering"},{"count":"60","id":"127","label":"Electrical Engineering"},{"count":"59","id":"126","label":"Civil Engineering"},{"count":"58","id":"162","label":"Architecture"},{"count":"58","id":"37","label":"Investment Management + Security Analysis"},{"count":"53","id":"116","label":"Mobile Technology"},{"count":"49","id":"139","label":"Business Law"},{"count":"49","id":"173","label":"Renewable Energies"},{"count":"49","id":"82","label":"Social Accounting"},{"count":"48","id":"30","label":"Political Science"},{"count":"45","id":"166","label":"Advanced Mathematics"},{"count":"44","id":"144","label":"Agriculture"},{"count":"40","id":"164","label":"Fashion & Design"},{"count":"39","id":"155","label":"Land & Water Management"},{"count":"35","id":"90","label":"Industrial relations"},{"count":"35","id":"28","label":"Monetary Economics + Public Finance"},{"count":"30","id":"114","label":"Artificial Intelligence"},{"count":"26","id":"125","label":"Chemical Engineering"},{"count":"25","id":"147","label":"Biology"},{"count":"24","id":"142","label":"International Law"},{"count":"23","id":"113","label":"Risk Management"},{"count":"23","id":"6","label":"Taxation"},{"count":"22","id":"35","label":"Insurance"},{"count":"21","id":"133","label":"Telecommunications Engineering"},{"count":"18","id":"168","label":"Construction"},{"count":"14","id":"140","label":"Civil Law"},{"count":"13","id":"111","label":"Purchasing"},{"count":"12","id":"146","label":"Biochemistry"},{"count":"10","id":"124","label":"Automotive Engineering"},{"count":"9","id":"159","label":"Organic Chemistry"},{"count":"8","id":"152","label":"General & Inorganic Chemistry"},{"count":"8","id":"160","label":"Physical Chemistry"},{"count":"6","id":"138","label":"Advanced Law"},{"count":"6","id":"151","label":"Food Engineering"},{"count":"6","id":"154","label":"Horticulture"},{"count":"5","id":"153","label":"Genetic Engineering"},{"count":"4","id":"148","label":"Biophysics"},{"count":"4","id":"174","label":"Robotics"},{"count":"3","id":"172","label":"Plant Products Technology"},{"count":"2","id":"145","label":"Applied Physics"},{"count":"2","id":"141","label":"Criminal Law"},{"count":"2","id":"161","label":"Process Engineering / Bioprocess"},{"count":"1","id":"167","label":"Animal Products Technology"},{"count":"1","id":"170","label":"Geometry"},{"count":"1","id":"171","label":"Hydromechanics"},{"count":"1","id":"157","label":"Microbiology"}];

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

		self.getAreas = function(container) {
			self.fakeRequest(areas, container);
		}

		self.request = function(request, container) {
			chrome.tabs.getSelected(null, function(tab) {
				chrome.tabs.sendMessage(tab.id, request, function(response) {
					container(response);
				});					
			});
		}

		self.fakeRequest = function(response, container) {
			container(response);
		}

		return self;
	}

	return aiesec;
})(aiesec)