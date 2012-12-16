var POSTdata  = {
	statusid:9,
	buttontype:" ",
	countrycode:" ",
	orgsearchtext:"Web",
	orgname:"j",
	page:1,
	date_from:"16.06.2012",
	date_to:"16.06.2013",
	questiontext:" ",
	browsetype:"tn",
	xchangetype:0,
	tncode:" ",
	getTN:"gepTN",
	status:-1,
	duration_from:6,
	duration_to:78
}

var GETdata  = "?operation=BrowseInternSearchResult&page=1&program=gip"
var URL = "/exchange/browseintern.do"

var params = {
	url: "http://www.myaiesec.net"+URL+GETdata,
	data: POSTdata,
	type: "POST",
	dataType: "text",
	success: function(response) {
	var dom = new DOMParser().parseFromString(response, 'text/html');
	var results = dom.getElementsByClassName("resulttableClass");
	max = results.length;
	console.log(max);
	for (var i=0; i < max; i++) {
		console.log(results[i]);
	}
    
	//jQuery("body").append("<iframe id='responseHolder'></iframe>")
	
	//console.log(xmlDoc);
	//jQuery("#responseHolder").html(response);

	/*

	var dom = jQuery('</html>');
	dom.html(response);
	//var dom = jQuery(new DOMParser().parseFromString(response, 'text/html'));
	var results = dom.find(".resulttableClass");
	console.log(results);
	var filteredActualResults = results.find("tr").filter(function(){ console.log(jQuery(this)); return jQuery(this).children().length === 3 });

	jQuery.each(filteredActualResults, function(i, v) {
		jQuery.each(jQuery(v).find("a"), function(j, u) {
			console.log(jQuery(u).val());
		})
	});
*/
}	
}

jQuery.ajax(params);