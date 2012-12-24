/**
* @author jjperezaguinaga
**/

var aiesec = (function(aiesec, undefined) {
	var a = aiesec || {};

	/**
	* Firebase controller logic that communicates with the Firebase BackEnd.
	* @constructor
	* @class firebase
	* @namespace aiesec
	* @chainable
	*/
	a.firebase = function() {
		var self = {};

		var AIESEC_URL = 'https://aiesec.firebaseio.com/';
		var USERS_LOCATION_URL =  'users_list';
		var USERS_DATA_URL =  'users_data';

		self.addMyData = function(seatInChat, myself, online, aiesecRef) {
			var userDataRef = aiesecRef.child(USERS_DATA_URL).child(seatInChat);
			if(!online) { //If just joined the chat, add ourselves to the chat.
				userDataRef.set(myself);
			}
		}

		self.loadLobby =  function(myself) {
			var aiesecRef = new Firebase(AIESEC_URL);
			var usersListRef = aiesecRef.child(USERS_LOCATION_URL);

			console.log(usersListRef);
			return;

			var online = false;
			var seatInChat = 0; 

			// Let's perform a transaction to load our users.
			usersListRef.transaction(function(userList) {
				if (userList === null) { //Empty chat
					userList = [];
				}

				//We see which users are online so we don't log in again.
				for (var i = 0; i < userList.length; i++) {
					if(userList[i] === myself.id) {
						online = true;
						seatInChat = i;
						return;
					}
				}

				// If we are not already online, we add ourselves.
				userList[i] = myself.id;
				seatInChat = i;
				return userList;

			}, function (success) {
				// Transaction completed.
				if(success || online) {
					self.addMyData(seatInChat, myself, online, aiesecRef);

					aiesecRef.child(USERS_LOCATION_URL).on('value', function(snapshot) {
						console.log(snapshot);
					})

					//self.lobby(usersListRef);
				} else {
					console.log("Error while enrolling to chat.");
				}
			});

		}

		self.init = function() {
			return self;
		}

		return self.init();
	}

	return a;
})(aiesec)