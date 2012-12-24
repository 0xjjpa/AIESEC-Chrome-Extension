/**
* Module for aiesec applications
* @module aiesec
**/

var aiesec = (function(aiesec, undefined) {
	var aiesec = aiesec || {};

	/**
	* Filters used in order to look for TN's.
	* @constructor
	* @class chat
	* @namespace aiesec
	* @chainable
	*/
	aiesec.chat = function() {
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
		* Lobby that holds all the current logged users.
		* @property lobby
		* @type {Array}
		**/
		self.lobby = ko.observableArray([]);


		/**
		* Profile for my session
		* @property myProfile
		* @type {AiesecUser}
		**/
		self.myProfile = ko.observable({});

		/*
		* Note on myProfile. First, it should be removed from the Chat, since its component shall be used across the entire
		* extension for authorization purposes.
		* Second, the current way of using the profile is not practical:
		*
		* Bootstrap application --> Bootstrap components --> Bootsrap chat --> Check profile, if bad, close extension, else, continue.
		*
		* This leads to processing something that may not be used, here's the proper way:
		*
		* Bootstrap application --> Check profile, if bad, close extension, else, continue --> Bootstrap components...
		*
		* In other words, nothing should be performed until we ensure that the user profile is authenticated.
		* We will leave that as a todo for next release.
		* @todo Isolate the functionality of the profile authentification.
		*/
		self.myProfile.subscribe(function(profile) {
			// We are logged in! 
			if(profile) {

				if(profile.firstname) {
					//Means it's in the raw form.
					/**
					* Profile in the raw form
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
					var id = profile.friendid;
					var name = profile.firstname + " " + profile.lastname;
					var country = profile.country;
					var profileUrl = "http://www.myaiesec.net/displayAvatar.do?friendid="+profile.friendid;

					var user = new AiesecUser(id, name, country, profileUrl);
					self.myProfile(user);
					
					//@todo Use local storage for caching with proper session removal. 
					//localStorage.setItem('myProfile', ko.toJSON(user));

					// We loaded ourselves successfully, time to connect with server;
					api.loadLobby(self.myProfile(), self.lobby);
				} 

			} else { // We are not logged in, so we won't allow access to the MyAIESEC app.
				var backgroundWindow = chrome.extension.getBackgroundPage();
				var backgroundPageController = backgroundWindow.aiesec.backgroundPageController();
				backgroundPageController.closeExtension();
				window.close();
			}
		})

		self.loadMyself = function() {
			var myProfile = localStorage.getItem('myProfile');
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
	}

	return aiesec;
})(aiesec);