/**
* @author jjperezaguinaga
**/

jQuery.noConflict();

chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {	
	//We assemble the request
	if (request.command) {
		var params = request.params;
		var callAjax = false;

		if(params && params.url !== "content") {
			var parserRequest = {
				url: params.url,
				type: params.type,
				data: params.data
			}
		}
	} else {
		return false;
	}

	// We see what kind of request we are going to use
	switch(request.command) {
		case "loadLobby":
			// This is an exclusive firebase request.
			var firebase = new aiesec.firebase();
			var myself = params.data;
			firebase.loadLobby(myself);
			break;

		case "getTN":
			var parser = new aiesec.parser();

			parserRequest.success = function(data) {
				var result = parser.parseTN(data);
				sendResponse(result);
			};

			parserRequest.error = function(data) {
				console.log("ERROR");
				var jxhr = data;
			};

		callAjax = true;
		break;

		case "getTNSummary":
			var parser = new aiesec.parser();

			parserRequest.success = function(data) {
				var result = parser.parseTNSummary(data);
				sendResponse(result);
			};

			parserRequest.error = function(data) {
				console.log("ERROR");
				var jxhr = data;
			};

		callAjax = true;
		break;

		case "getNationalList":
			var parser = new aiesec.parser();

			parserRequest.success = function(data) {
				var result = parser.parseNationalList(data);
				sendResponse(result);
			};

			parserRequest.error = function(data) {
				console.log("ERROR");
				var jxhr = data;
			};

		callAjax = true;
		break;

		case "getBackground":
			var parser = new aiesec.parser();
			parserRequest.success = function(data) {
				var result = parser.parseBackgroundResults(data);
				sendResponse(result);
			};

			parserRequest.error = function(data) {
				console.log("ERROR");
				var jxhr = data;
			};


		callAjax = true;
		break;

		case "getDemand":
			var parser = new aiesec.parser();

			parserRequest.success = function(data) {
				var result = parser.parseDemandResults(data);
				sendResponse(result);
			};

			parserRequest.error = function(data) {
				console.log("ERROR");
				var jxhr = data;
			};


		callAjax = true;
		break;

		case "getProfile":
			// We needa new parser in order to retrieve the information from the content page
			var parser = new aiesec.parser();

			/*
			* So here's the thing, we have 2 ways to approach this problem: We can use the current content window,
			* and assume the user is logged in the page, retrieving the current page and use that.
			* 
			* This is a security vulnerability. Why?
			* The way the Chrome Extension works is reads the url and makes sure you are at MyAIESEC.net, otherwise
			* it won't trigger itself. However, there's a really easy way to fool that: change the hosts file in any
			* computer and set up for instance
			*
			* 127.0.0.1 myaiesec.net
			*
			* Then, the hacker can put any page he/she wants and the Chrome Extension will trigger. Now, assuming the 
			* hacker can read the parser code, he can put a script in the form that matches my regular expression,
			* allowing himself/herself to inject into the system, even if he's not part of AIESEC.
			*
			* This is the code to do it through this insecure, bad way:
			*

			//We get the current window document and retrieve the script that contains the logged in data
			var document = jQuery(window.document);

			// We will do most of the computation here to avoid sending a big amount of information
			var contentScript = document.find("script[src='/scripts/common.js']").next().html();

			var result = parser.getProfile(contentScript);
			sendResponse(result);

			* NOTE: This was never implemented. It was left here as a proof of all scenarios were considered and as
			* example of how a Chrome Extension can have a security vulnerability.
			*
			* So enough with the lecture, there's actually one way to do this. We query the actual IP and parse the result;
			* a proper whois to the aiesec domain show us that the A host is 195.219.251.154, so we are going to use that.
			* (We need to add that as part of the permission url in order to allow the Cross-Origin-Policy)
			*
			* The request is a normal query to the stagehome.do url, which in case the user was not validated, returns a page
			* with the legend your session has expired.
			*
			* NOTE: Is there a way to break this? Not sure, I imagine that through some sort of IP spoofing and some routing network magic
			* it can be done. The proper way would be to have some handshake with the server, some token through an Oauth2 REST service but
			* hey, life is not always happy is it?
			*
			* UPDATE: It seems that when requesting directly the IP, MyAIESEC session system doesn't account the request as one
			* made by a previous client and uses it as a new one. We will use then the URL (myaiesec.net) as a temporal solution
			* while we solve this problem. We are most likely going to have an internal registration inside the Chat.
			* @todo Review this vulnerability and check access through IP instead of MyAIESEC.net url.
			* @todo See the possibility of making a Oauth2 provider that scraps the portal and returns the results throuhg REST.
			*/

			parserRequest.success = function(data) {
				var result = parser.getProfile(data);
				sendResponse(result);
			};

			parserRequest.error = function(data) {
				console.log("ERROR");
				console.log(data);
				var jxhr = data;
			};

		callAjax = true;
		break;
	}

	// We fire the request
	if(parserRequest.success && parserRequest.error && callAjax) jQuery.ajax(parserRequest);
	return true;
});