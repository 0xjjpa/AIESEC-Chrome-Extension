$(document).ready(function() {
	var AIESECViewModel = new aiesec.viewModel();	

	//@todo Load templates in a smarter way
	$("#aiesecTemplate").load('js/libs/aiesec/aiesecTemplate.html', function() {
		$("#bootstrapSearchTNtemplate").load('js/libs/aiesec/tnSearchTool/tnSearchToolTemplate.html', function() {	
			ko.applyBindings(AIESECViewModel);	
		})	
	})	
})




