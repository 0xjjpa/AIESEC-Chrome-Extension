jQuery.noConflict();

chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {	
	var parser = new aiesec.parser();

	switch(request.command) {
		case "getNationalList":
		var params = request.params;
		var request = {
			url: params.url,
			type: params.type,
			data: params.data,
			success: function(data) {
				var result = parser.parseNationalList(data);
				console.log(result);
				sendResponse(result);   
			},
			error: function(data) {
				console.log("ERROR");
				var jxhr = data;
			}
		}		
		jQuery.ajax(request);
		return true;	
		break;		
	}
});