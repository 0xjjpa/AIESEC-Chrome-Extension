jQuery.noConflict();

chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
	if(request.load) {
		sendResponse({content: "Content received message, up and running."})
		return true;
	} else {
		switch(request.command) {
			case "getNationalList":
			var parser = new aiesec.parser();
			var params = request.params;
			if(params) {
				var request = {
					url: params.url,
					type: params.type,
					data: params.data,
					success: function(data) {
						var result = parser.parseNationalList(data);
						sendResponse(result);   
					},
					error: function(data) {
						console.log("ERROR");
						var jxhr = data;
					}
				}		
				jQuery.ajax(request);
				return true;	
			}
			return false;
		}
	}
});