$(document).ready(function() {
		
	window.addEventListener('message', function(event) {
		//console.log("Bootstrap Received Signal to RenderKnockout");
		//event.source.postMessage({data: $("#aiesecTest")[0](event.data.context)}, event.origin);
	});
	
	var AIESECViewModel = new aiesec.viewModel();
	
	// We REALLY need to find a better way to organize this...
	$("#aiesecTemplate").load('js/libs/aiesec/aiesecTemplate.html', function() {
		$("#bootstrapSearchTNtemplate").load('js/libs/aiesec/tnSearchTool/tnSearchToolTemplate.html', function() {
			$("#bootstrapMonitorTNtemplate").load('js/libs/aiesec/tnMonitor/tnMonitorToolTemplate.html', function() {
				ko.applyBindings(AIESECViewModel);
			})
		});
	});
	
});
