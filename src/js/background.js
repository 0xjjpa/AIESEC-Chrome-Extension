var backgroundPage = new aiesec.backgroundPageController();



// Listen for any changes to the URL of our tab
/*
var backgroundModule = function() {
	var self = {};

	//We prepare everything for our extension! We need to load the templates.
	var iframe = document.getElementById("aiesec-frame");
	var data = {
		command: "render"
	};

	iframe.contentWindow.postMessage(data, "*");

	window.addEventListener('message', function(event) {
		// We don't display the content of the Popup until it has loaded everything required
		// We send then the information to the proper popup.html
		console.log("Background Received Signal to Set up Popup");
	});

	return self;
};
*/