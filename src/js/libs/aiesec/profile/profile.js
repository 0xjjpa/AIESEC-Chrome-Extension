var aiesec = (function(aiesec, undefined) {
	var aiesec = aiesec || {};

	/**
	* Library that controls the authentication layer for the application
	* @class profile
	* @chainable
	* @namespace aiesec
	* @constructor
	**/
	aiesec.profile = function() {
		var self = {};
		var api = new aiesec.api();

		/**
		* An object with all the country codes retrieved by MyAIESEC.net with their standard 2 letter value.
		* @property countryCodes
		* @type {Object}
		* @private
		**/
		var countryCodes = {
	      "AFGHANISTAN":"af",
	      "ALBANIA":"al",
	      "ALGERIA":"dz",
	      "ARMENIA":"am",
	      "AUSTRALIA":"au",
	      "AUSTRIA":"at",
	      "AZERBAIJAN":"az",
	      "BAHRAIN":"bh",
	      "BELGIUM":"be",
	      "BENIN":"bj",
	      "BOLIVIA":"bo",
	      "BOSNIA - HERZEGOVINA":"ba",
	      "BOTSWANA":"bw",
	      "BRAZIL":"br",
	      "BULGARIA":"bg",
	      "BURKINA FASO":"bf",
	      "CAMBODIA":"kh",
	      "CAMEROON":"cm",
	      "CANADA":"ca",
	      "CAS - COSTA RICA":"cr",
	      "CAS - PANAMA":"pa",
	      "COLOMBIA":"co",
	      "COTE DIVOIRE":"ci",
	      "CROATIA":"hr",
	      "CZECH REPUBLIC":"cz",
	      "DENMARK":"dk",
	      "DOMINICAN REPUBLIC":"do",
	      "ECUADOR":"ec",
	      "EGYPT":"eg",
	      "EL SALVADOR":"sv",
	      "ESTONIA":"ee",
	      "ETHIOPIA":"et",
	      "FINLAND":"fi",
	      "FRANCE":"fr",
	      "GABON":"ga",
	      "GEORGIA":"ge",
	      "GERMANY":"de",
	      "GHANA":"gh",
	      "GREECE":"gr",
	      "GUATEMALA":"gt",
	      "HONG KONG":"hk",
	      "HUNGARY":"hu",
	      "ICELAND":"is",
	      "INDIA":"in",
	      "INDONESIA":"id",
	      "IRAN":"ir",
	      "IRELAND":"ie",
	      "ITALY":"it",
	      "JAPAN":"jp",
	      "JORDAN":"jo",
	      "KAZAKHSTAN":"kz",
	      "KENYA":"ke",
	      "KOREA":"kr",
	      "KYRGYZSTAN":"kg",
	      "LATVIA":"lv",
	      "LEBANON":"lb",
	      "LIBERIA":"lr",
	      "LITHUANIA":"lt",
	      "MACEDONIA, FYRO":"mk",
	      "MAINLAND CHINA":"cn",
	      "MALAYSIA":"my",
	      "MALTA":"mt",
	      "MAURITIUS":"mu",
	      "MEXICO":"mx",
	      "MOLDOVA":"md",
	      "MONGOLIA":"mn",
	      "MOROCCO":"ma",
	      "MOZAMBIQUE":"mz",
	      "NEPAL":"np",
	      "NEW ZEALAND":"nz",
	      "NICARAGUA":"ni",
	      "NIGERIA":"ng",
	      "NORWAY":"no",
	      "OMAN":"om",
	      "PAKISTAN":"pk",
	      "PARAGUAY":"py",
	      "PERU":"pe",
	      "POLAND":"pl",
	      "PORTUGAL":"pt",
	      "PUERTO RICO":"pr",
	      "QATAR":"qa",
	      "ROMANIA":"ro",
	      "RUSSIA":"ru",
	      "RWANDA":"rw",
	      "SENEGAL":"sn",
	      "SERBIA":"rs",
	      "SINGAPORE":"sg",
	      "SLOVAKIA":"sk",
	      "SLOVENIA":"si",
	      "SOUTH AFRICA":"za",
	      "SOUTHERN CONE - ARGENTINA":"ra",
	      "SOUTHERN CONE - CHILE":"cl",
	      "SOUTHERN CONE - URUGUAY":"uy",
	      "SPAIN":"es",
	      "SRI LANKA":"lk",
	      "SWEDEN":"se",
	      "SWITZERLAND":"ch",
	      "TAIWAN":"tw",
	      "TAJIKISTAN":"tj",
	      "TANZANIA":"tz",
	      "THAILAND":"th",
	      "THE NETHERLANDS":"nl",
	      "THE PHILIPPINES":"ph",
	      "TOGO":"tg",
	      "TUNISIA":"tn",
	      "TURKEY":"tr",
	      "UGANDA":"ug",
	      "UKRAINE":"ua",
	      "UNITED ARAB EMIRATES":"ae",
	      "UNITED KINGDOM":"gb",
	      "UNITED STATES":"us",
	      "VENEZUELA":"ve",
	      "VIETNAM":"vn"
	    }

		/**
		* Wrapper for a specific user inside the chat lobby.
		* @constructor
		* @class AiesecUser
		* @chainable
		**/

		// Raw form
		/*
		committee: "AIESEC QUERETARO"
		country: "MEXICO"
		friendid: 1000347038
		firstname: "Jose Jesus"
		lastname: "Perez Aguinaga"
		page_url: "http://www.myaiesec.net/stagehome.do"
		username: "me@jjperezaguinaga.com"
		userprog: "GIP,TMP"
		xp_stage: "ELD"
		*/
		var AiesecUser = function(id, name, country, profileUrl) {
			var self = {};

			self.id = id; 
			self.name = name;
			self.country = country;
			self.profileUrl = profileUrl;

			self.flagCountry = (function() {
				return "flag flag-" + countryCodes[self.country];
			})();

			return self;
		}

		/**
		* Flag to know what's the status of the Profile object
		* @property profileWasLoaded
		* @type {Boolean}
		**/
		self.profileWasLoaded = ko.observable(false);

		/**
		* Profile for my session
		* @property myProfile
		* @type {AiesecUser}
		**/
		self.myProfile = ko.observable({});


		/**
		* JSON Object without KO bindings
		* @property JSONObject
		* @type {Object}
		**/
		self.JSONObject = {};


		self.myProfile.subscribe(function(profile) {
			// If we haven't loaded the profile before, we do it for the first time.
			if(!self.profileWasLoaded()) {

				// We need to connect with the background window no matter if we received a profile or not.
				var backgroundWindow = chrome.extension.getBackgroundPage();
				var backgroundPageController = backgroundWindow.aiesec.backgroundPageController();

				// We are going to check if we are given a profile object
				if(profile) {
					// We have! Time to parse it from the raw form (See AiesecUser raw form)					
					var id = profile.friendid;
					var name = profile.firstname + " " + profile.lastname;
					var country = profile.country;
					var profileUrl = "http://www.myaiesec.net/displayAvatar.do?friendid="+profile.friendid;

					var user = new AiesecUser(id, name, country, profileUrl);

					// Careful, we will call the myProfile observer, without this flag the call would lead to an infinite loop.
					self.profileWasLoaded(true);
					self.myProfile(user);
					self.JSONObject = ko.toJS(user);

					backgroundPageController.loadExtension();
					//@todo Use local storage for caching with proper session removal. 
					//localStorage.setItem('myProfile', ko.toJSON(user));					

				} else { 
					// We are not logged in, so we won't allow access to the MyAIESEC app.
					// Careful, we won't update the profileWasLoaded var as this would lock users from trying again.
					backgroundPageController.closeExtension();
				}
			}
		});

		self.loadMyself = function() {
			var myProfile = localStorage.getItem('myProfile');
			console.log("Calling profile");
			if(myProfile) {
				var rawUser = JSON.parse(myProfile);
				self.myProfile(new AiesecUser(rawUser.id, rawUser.name, rawUser.country, rawUser.profileUrl));
			} else {
				api.getProfile(self.myProfile);
			}

		}

		self.init =  function() {
			self.loadMyself();
			return self;
		}

		return self.init();
	};


	return aiesec;
})(aiesec);

