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
		* An array with all the possible background to filter a TN with (up to date at 15/12/2012)
		* @property backgrounds
		* @type {Array}
		*/
		var backgrounds = [{"Auditing":"1","Cost accounting":"2","Financial accounting":"3","Introductory accounting":"4","Managerial accounting":"5","Purchasing":"111","Social & Ethical Editing + Reporting":"81","Social Accounting":"82","Taxation":"6","Architecture":"162","Arts":"163","Fashion & Design":"164","Graphic Design":"165","Corporate Community Engagement":"83","Crisis Management":"112","Event Management":"84","Hotel + Restaurant Management":"7","Industrial Management":"8","International Management":"9","Introduction to Management / Business Administration":"10","Organisation Management + Planning":"12","Project Management":"14","Transportation / Distribution Management":"16","Introduction to Communications":"135","Journalism":"136","Public Relations":"137","Advanced Cultural Education":"107","Bilingual and Cross Cultural Education":"98","International Education":"108","Introductory Cultural Education":"106","Developmental Economics":"24","Economic Research + Forecasting":"31","Environmental Economics":"25","International Trade + Balance of Payment":"23","Introductory Economics":"26","Macroeconomics":"27","Microeconomics":"29","Monetary Economics + Public Finance":"28","Political Science":"30","Statistics":"85","Aerospace Engineering":"123","Automotive Engineering":"124","Chemical Engineering":"125","Civil Engineering":"126","Electrical Engineering":"127","Electronics Engineering":"128","Environmental Engineering":"129","Industrial Engineering":"130","Introductory Engineering":"131","Mechanical Engineering":"132","Telecommunications Engineering":"133","Banking":"32","Financial Planning + Budgeting":"33","Insurance":"35","International Financial Management":"36","Introductory Finance":"34","Investment Management + Security Analysis":"37","Risk Management":"113","Advanced HR management":"89","Industrial relations":"90","International Resource Management":"86","Introductory HR management":"13","Organisational Behaviour":"91","Personal Evaluation":"88","Recruitment and Allocation":"87","Training and Development":"92","Artificial Intelligence":"114","Database Management":"95","Mobile Applications":"115","Mobile Technology":"116","Network Management & Data Transmission":"94","Software Development and Programming":"19","Systems Analysis and Design":"22","Web Development and Management":"93","Advanced Law":"138","Business Law":"139","Civil Law":"140","Criminal Law":"141","International Law":"142","Introductory Law":"143","Advertising + Public Relations":"40","Brand & Trademark Management":"120","Consumer + Buyer Behaviour":"41","Customer Relationship Management":"121","Import & Export":"43","International Marketing":"44","Introductory Marketing":"45","Market Research & Evaluation":"42","Product Planning, Development & Control":"46","Retail + Sales Marketing":"47","Agriculture":"144","Applied Physics":"145","Biochemistry":"146","Biology":"147","Biophysics":"148","Ecology":"149","Environmental Protection":"150","Food Engineering":"151","General & Inorganic Chemistry":"152","Genetic Engineering":"153","Horticulture":"154","Land & Water Management":"155","Medicine & Healthcare":"156","Microbiology":"157","Molecular Biology":"158","Organic Chemistry":"159","Physical Chemistry":"160","Process Engineering / Bioprocess":"161","Advanced Mathematics":"166","Animal Products Technology":"167","Construction":"168","Fermentation Technology":"169","Geometry":"170","Hydromechanics":"171","Plant Products Technology":"172","Renewable Energies":"173","Robotics":"174","Tourism":"175","Counselling and Guidance":"103","Development Studies":"122","Psychology":"102","Social Work":"101","Sociology":"100","Advanced Teaching":"67","Child (Youth) Education":"117","Foreign Languages Education":"118","Introductory Teaching":"66","Linguistics":"39","Subjects Education":"119"}];

		/**
		* An array with all the possible skills to filter a TN with (up to date at 15/12/2012)
		* @property skills
		* @type {Array}
		*/
		var skills = [{"Construction Management":"147","Ecology":"154","Fire Safety Engineering":"145","Hydrology":"149","Hydromechanics":"150","Introductory Structural design":"146","Mechanics":"139","Process Engineering":"129","Renewable Energies":"151","Soil Mechanics":"148","Solid Construction":"142","Static":"140","Steel Construction":"143","Technology of Building Materials":"144","Waste & Water Management":"153","Wood Construction":"141","Internet User Skills":"41","Mac User Skills":"40","PC User Skills":"39","DB/2":"61","Microsoft Access":"52","Microsoft SQL Server":"63","MySQL":"118","Oracle":"115","PostgreSQL":"117","Sybase":"66","Database Design and Development Tools":"67","Delphi":"68","Eclipse":"116","Other Development Tools":"69","Powerbuilder":"70","Visual Basic":"108","Visual Studio":"72","Visual/Borland C++":"73","Baan":"75","Microsoft Business Solution":"112","PeopleSoft":"76","SAP":"77","Salesforce":"113","Siebel":"114","3D Max":"78","Auto-CAD":"79","Corel Draw":"80","Macromedia director/studio":"81","Photoshop":"82","Shockwave Flash":"83","Lotus Notes/Domino":"84","MS Exchange":"85","Novell Groupwise":"86","Aerospace Engineering":"123","Aircraft Engine Technology":"127","Automotive Engineering":"125","Computer aided design":"121","Construction Engineering":"135","Designing Commercial Aircrafts":"130","Engineering Mechanics":"126","Ergonomics":"137","Fluid Mechanics":"124","Fuel Cells":"132","Machine Elements":"131","Manufacturing Technology":"138","Mass and Heat Transfer":"134","Material Science":"122","Operations Research":"136","Rotor Technology":"128","Thermodynamics":"133","IP Telephony(VoIP)":"110","IPX":"7","LAN (local area network)":"87","Novell netware":"5","TCP/IP":"8","UMTS/GSM network management":"111","WAN (wide area network)":"88","WAP":"89","AS/400":"20","MacOS":"18","UNIX/Linux OS":"11","Windows Operating Systems":"14","X-Windows":"12","Community Development":"4","Driver's licence":"1","First Aid":"3","Client Servicing Skills":"119","Financial Management skills":"37","Language Teaching":"95","Leadership skills":"35","Marketing / Selling skills":"38","Organisational Management":"2","Presentation skills":"36","Project Management":"33","Team Management":"32","Training/ Facilitating skills":"34","ASP":"90","Ajax":"155","C":"22","C#":"105","C++":"23","COBOL":"24","CSS":"156","FoxPro":"157","HTML":"28","J#":"106","Java":"29","Javascript":"91","Jscript":"107","Mercury":"158","OPS5":"159","PHP":"109","Pascal":"26","Perl/CGI-bin":"30","Prolog":"160","Python":"120","Ruby":"161","SQL":"94","XML":"92"}];

		/**
		* An array with the possible areas to pick TN's for (up to date at 05/08/2012)
		* @property areas
		* @type {Array}
		*/
		var areas = [{"count":"2961","id":"101","label":"Social Work"},{"count":"2395","id":"117","label":"Child (Youth) Education"},{"count":"2168","id":"14","label":"Project Management"},{"count":"1877","id":"106","label":"Introductory Cultural Education"},{"count":"1854","id":"98","label":"Bilingual and Cross Cultural Education"},{"count":"1693","id":"66","label":"Introductory Teaching"},{"count":"1432","id":"118","label":"Foreign Languages Education"},{"count":"1389","id":"108","label":"International Education"},{"count":"1258","id":"92","label":"Training and Development"},{"count":"1241","id":"39","label":"Linguistics"},{"count":"1128","id":"119","label":"Subjects Education"},{"count":"1087","id":"40","label":"Advertising + Public Relations"},{"count":"1026","id":"84","label":"Event Management"},{"count":"1001","id":"42","label":"Market Research & Evaluation"},{"count":"975","id":"122","label":"Development Studies"},{"count":"953","id":"107","label":"Advanced Cultural Education"},{"count":"891","id":"102","label":"Psychology"},{"count":"872","id":"45","label":"Introductory Marketing"},{"count":"849","id":"44","label":"International Marketing"},{"count":"841","id":"93","label":"Web Development and Management"},{"count":"825","id":"67","label":"Advanced Teaching"},{"count":"729","id":"19","label":"Software Development and Programming"},{"count":"724","id":"103","label":"Counselling and Guidance"},{"count":"697","id":"100","label":"Sociology"},{"count":"677","id":"95","label":"Database Management"},{"count":"675","id":"12","label":"Organisation Management + Planning"},{"count":"582","id":"47","label":"Retail + Sales Marketing"},{"count":"561","id":"41","label":"Consumer + Buyer Behaviour"},{"count":"468","id":"137","label":"Public Relations"},{"count":"466","id":"163","label":"Arts"},{"count":"465","id":"22","label":"Systems Analysis and Design"},{"count":"431","id":"10","label":"Introduction to Management / Business Administration"},{"count":"360","id":"150","label":"Environmental Protection"},{"count":"360","id":"46","label":"Product Planning, Development & Control"},{"count":"344","id":"83","label":"Corporate Community Engagement"},{"count":"332","id":"94","label":"Network Management & Data Transmission"},{"count":"330","id":"121","label":"Customer Relationship Management"},{"count":"319","id":"91","label":"Organisational Behaviour"},{"count":"318","id":"135","label":"Introduction to Communications"},{"count":"317","id":"175","label":"Tourism"},{"count":"307","id":"9","label":"International Management"},{"count":"290","id":"7","label":"Hotel + Restaurant Management"},{"count":"284","id":"136","label":"Journalism"},{"count":"282","id":"4","label":"Introductory accounting"},{"count":"277","id":"43","label":"Import & Export"},{"count":"276","id":"165","label":"Graphic Design"},{"count":"238","id":"3","label":"Financial accounting"},{"count":"231","id":"33","label":"Financial Planning + Budgeting"},{"count":"223","id":"34","label":"Introductory Finance"},{"count":"212","id":"1","label":"Auditing"},{"count":"210","id":"88","label":"Personal Evaluation"},{"count":"202","id":"24","label":"Developmental Economics"},{"count":"186","id":"149","label":"Ecology"},{"count":"173","id":"26","label":"Introductory Economics"},{"count":"166","id":"13","label":"Introductory HR management"},{"count":"165","id":"156","label":"Medicine & Healthcare"},{"count":"160","id":"89","label":"Advanced HR management"},{"count":"157","id":"63","label":"Introductory Development Studies"},{"count":"145","id":"87","label":"Recruitment and Allocation"},{"count":"132","id":"81","label":"Social & Ethical Editing + Reporting"},{"count":"129","id":"32","label":"Banking"},{"count":"128","id":"143","label":"Introductory Law"},{"count":"127","id":"120","label":"Brand & Trademark Management"},{"count":"117","id":"132","label":"Mechanical Engineering"},{"count":"110","id":"5","label":"Managerial accounting"},{"count":"98","id":"31","label":"Economic Research + Forecasting"},{"count":"95","id":"110","label":"Advanced Education"},{"count":"92","id":"29","label":"Microeconomics"},{"count":"91","id":"2","label":"Cost accounting"},{"count":"90","id":"86","label":"International Resource Management"},{"count":"89","id":"27","label":"Macroeconomics"},{"count":"88","id":"8","label":"Industrial Management"},{"count":"85","id":"25","label":"Environmental Economics"},{"count":"85","id":"130","label":"Industrial Engineering"},{"count":"80","id":"36","label":"International Financial Management"},{"count":"80","id":"85","label":"Statistics"},{"count":"76","id":"23","label":"International Trade + Balance of Payment"},{"count":"74","id":"115","label":"Mobile Applications"},{"count":"73","id":"16","label":"Transportation / Distribution Management"},{"count":"65","id":"128","label":"Electronics Engineering"},{"count":"63","id":"112","label":"Crisis Management"},{"count":"63","id":"131","label":"Introductory Engineering"},{"count":"62","id":"129","label":"Environmental Engineering"},{"count":"60","id":"127","label":"Electrical Engineering"},{"count":"59","id":"126","label":"Civil Engineering"},{"count":"58","id":"162","label":"Architecture"},{"count":"58","id":"37","label":"Investment Management + Security Analysis"},{"count":"53","id":"116","label":"Mobile Technology"},{"count":"49","id":"139","label":"Business Law"},{"count":"49","id":"173","label":"Renewable Energies"},{"count":"49","id":"82","label":"Social Accounting"},{"count":"48","id":"30","label":"Political Science"},{"count":"45","id":"166","label":"Advanced Mathematics"},{"count":"44","id":"144","label":"Agriculture"},{"count":"40","id":"164","label":"Fashion & Design"},{"count":"39","id":"155","label":"Land & Water Management"},{"count":"35","id":"90","label":"Industrial relations"},{"count":"35","id":"28","label":"Monetary Economics + Public Finance"},{"count":"30","id":"114","label":"Artificial Intelligence"},{"count":"26","id":"125","label":"Chemical Engineering"},{"count":"25","id":"147","label":"Biology"},{"count":"24","id":"142","label":"International Law"},{"count":"23","id":"113","label":"Risk Management"},{"count":"23","id":"6","label":"Taxation"},{"count":"22","id":"35","label":"Insurance"},{"count":"21","id":"133","label":"Telecommunications Engineering"},{"count":"18","id":"168","label":"Construction"},{"count":"14","id":"140","label":"Civil Law"},{"count":"13","id":"111","label":"Purchasing"},{"count":"12","id":"146","label":"Biochemistry"},{"count":"10","id":"124","label":"Automotive Engineering"},{"count":"9","id":"159","label":"Organic Chemistry"},{"count":"8","id":"152","label":"General & Inorganic Chemistry"},{"count":"8","id":"160","label":"Physical Chemistry"},{"count":"6","id":"138","label":"Advanced Law"},{"count":"6","id":"151","label":"Food Engineering"},{"count":"6","id":"154","label":"Horticulture"},{"count":"5","id":"153","label":"Genetic Engineering"},{"count":"4","id":"148","label":"Biophysics"},{"count":"4","id":"174","label":"Robotics"},{"count":"3","id":"172","label":"Plant Products Technology"},{"count":"2","id":"145","label":"Applied Physics"},{"count":"2","id":"141","label":"Criminal Law"},{"count":"2","id":"161","label":"Process Engineering / Bioprocess"},{"count":"1","id":"167","label":"Animal Products Technology"},{"count":"1","id":"170","label":"Geometry"},{"count":"1","id":"171","label":"Hydromechanics"},{"count":"1","id":"157","label":"Microbiology"}];


		/**
		* A mock object to replicate the response of a profile request
		* @property user
		* @private
		* @type {Object}
		**/
		var user = {name: "Jose Jesus Perez Aguinaga", country: "Mexico", profileId: "1000347038"};

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

		self.loadLobby = function(myself, container) {
			var params = {
				url: "content",
				data: JSON.stringify(myself),
				type: "GET"
			}
			var request = {command: "loadLobby", params: params};
			self.request(request, container)
		}

		self.getProfile = function(container) {
			
			var params = {
				url: "http://www.myaiesec.net/stagehome.do",
				//url: "http://195.219.251.154/stagehome.do",
				data: {},
				type: "GET"
			}
			var request = {command: "getProfile", params: params};
			self.request(request, container);
			

			/*
			var backgroundWindow = chrome.extension.getBackgroundPage();
			var backgroundPageController = backgroundWindow.aiesec.backgroundPageController();
			console.log('Loading Background Page Controller');
			backgroundPageController.getCurrentWindow();
			*/


			// self.fakeRequest(user, container);
		}

		self.searchDemand = function(params, container) {
			var data = {
				operation:"toptentn",
				type:"demand",
				bgrId: "",
				committeeId: "",
				xchType: "",
				durFrom: "",
				durTo: "",
				subbgrname: "",
				programType:"gip",
				categorybyselected: "",
				scope:params.scope,
				cmtId:params.subscope,
				exchangetype:params.exchange,
				categoryby:0,
				categoryby1:0,
				durationFrom:params.start,
				durationTo:params.end
			};

			var params = {
				url: "http://www.myaiesec.net/exchange/toptendemandsupply.do",
				data: data,
				type: "POST",
				dataType: "text"
			}

			var request = {command: "getDemand", params: params};
			self.request(request, container);
		}

		self.request = function(request, container) {
			chrome.tabs.getSelected(null, function(tab) {
				// We may request from a settings page or when the tab is unknown.
				if(tab) {
					chrome.tabs.sendMessage(tab.id, request, function(response) {
						console.log(response);
						container(response);
					});			
				}
			});
		}

		self.fakeRequest = function(response, container) {
			container(response);
		}

		return self;
	}

	return a;
})(aiesec)