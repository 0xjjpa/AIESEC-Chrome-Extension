jQuery.noConflict();

chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {	
	// Communication check
	if(request.load) {
		sendResponse({content: "Content received message, up and running."})
		return true;
	} else {

		//We assemble the request
		if (request.command) {
			var params = request.params;

			if(params) {
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
			break;

			case "getProfile":
				var document = jQuery(window.document);
				var contentScript = document.find("script[src='/scripts/common.js']").next().html();

				var regex = /document.getElementById\('support_([^\']+)'\)\.value='([^\']+)';/g;

				var match;
				for(var i = 0; i < 8; i++) {
					match = regex.exec(contentScript);
					console.log(match);
				}
				
				//sendResponse({content: "Content received message, up and running."})
				/*
				chrome.tabs.getCurrent(function(tab) {
					console.log(tab);
				})
				*/
			return false;
			break;
		}

		// We fire the request
		if(parserRequest.success && parserRequest.error) jQuery.ajax(parserRequest);
	}
});