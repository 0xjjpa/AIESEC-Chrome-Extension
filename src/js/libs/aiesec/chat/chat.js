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
		var USERS_URL = 'https://aiesec.firebaseio.com/users';

		/**
		* Wrapper for a specific user inside the chat lobby.
		* @constructor
		* @class AiesecUser
		* @chainable
		**/
		var AiesecUser = function(name, country, profileUrl) {
			this.name = name;
			this.country = country;
			this.profileUrl = profileUrl;
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

		self.loadMyself = function() {
			var myProfile = localStorage.getItem('myProfile');
			if(myProfile) {
				var rawUser = JSON.parse(myProfile);
				self.myProfile(new AiesecUser(rawUser.name, rawUser.country, rawUser.profileUrl));
			} else {
				api.getProfile(self.myProfile);
				//localStorage.setItem('myProfile', ko.toJSON(self.myProfile));
			}

		}


		self.loadUsers =  function() {
			self.loadMyself();
		}

		self.init =  function() {
			self.loadUsers();
			return self;
		}

		return self.init();
	}

	return aiesec;
})(aiesec);