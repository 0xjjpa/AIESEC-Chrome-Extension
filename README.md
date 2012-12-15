# AIESEC Google Chrome Extension
@by [jjperezaguinaga](http://im.jjperezaguinaga.com)

## Introduction

In order to provide a better experience to the current stakeholders of MyAIESEC.net, I'm currently developing an application that eases the following tasks inside the system:

* Find TN's given some specific parameters (Countries, Interests)
* Find EP's given some specific parameters (Skills)

A previous attempt was done [here](https://chrome.google.com/webstore/detail/aiesec-tn-lookup/ebojdlfifalbfankoldbfmcfkpfkcccc) through a Google Chrome Extension. Sadly, due it's lack of interface, it's hard to actually speed up some of the aforementioned tasks

## Chrome Extension
Currently this repository still holds the content of an improved Google Chrome application using the following technologies:

* Twitter Bootstrap
* KnockoutJS

Sadly, due new changes to Chrome 22, the KnockoutJS templating system was forbidden due it's use of inline eval. This delayed the release date for about 4 months, and the project has been stopped so far even though development has continued in more subtle ways.

### Current tested solutions in order to deploy application

* Expose templating system through an iframe, escaping eval (Read more on ["Using eval in Chrome Extensions. Safely"](http://developer.chrome.com/apps/sandboxingEval.html)).
** Status: FAILED - Knockout js templating system is based on data binding, which can not be isolated from the dom.

* Use the [Unobtrusive plugin](http://bsatrom.github.com/Knockout.Unobtrusive/) in order to pre-render the template in order to bind the content afterwards.
** Status: FAILED - The plugin is stil in development, so scoping bindings such as "with" are still unsupported.

### Documentation 
The Chrome Extension has proper documentation wrote in [YuiDocs](http://yui.github.com/yuidoc/) Syntax. To get docs run the following command inside the js folder. (Note, nodejs and npm required)

```
$ yuidoc .
```

# AIESEC Scrapping Research

In order to properly develop a tool that correctly browses the information Users require, a scrapping research is being performed at main sections of the webpage. The following is a list of some basic queries that can be performed in the system with the proper parameters.

Please take the documentation here as a proof of concept. This an interpretation of experiments performed on my behalf to the myaiesec.net site. This is by no means official documentation and is being supported only by my individual efforts.

This research has been done for the last 4 months, in order to evaluate the current architecture of the site. Although a Chrome Extension seems a proper solution in order to enhance the capabilities of the portal, by having a documentation of the API, other developers can research on the contents of the System. 

## Table of contents

* [contentscope.do](#-exchangecontentscopedo)
* [browseintern.do](#-exchangebrowseinterndo)

This queries can be performind inside the system through the following commands:

```javascript
	var data = { ... } // Where data is the javascript object with the POST params documented here.
	var url = " ... " // Where url is the javascript string with the url for the resource. e.g. contentscope.do
	var params = { 
		url: "http://www.myaiesec.net/exchange/"+url,
		data: data,
		type: "POST"				
	}
	jQuery.ajax(params)
```

This code can be run directly in the Chrome Console / Firefox Firebug Console / Opera Dragon Fly Console. Use the Network tab (or HTTP Sniffer equivalent) to browse the response. Additionally, you can append the GET params in the form:

```
	url: "http://www.myaiesec.net/exchange/"+url+"&"+key+"="+value,
```

Where key is any key given as part of the GET params in this documentation and value its respective value. Append additional values with "&".

Finally, if you want to browse the data response directly in your console, append the following success function to the params object.

```javascript
	var params = { 
		url: "http://www.myaiesec.net/exchange/"+url,
		data: data,
		type: "POST",
		success: function(data) { console.log(data); }				
	}
```

## <a name="#content"></a> /exchange/contentscope.do
Contentscope.do allows you obtain some relationships that the system has, specially related with id's for area and country codes.

> National Lookup (Get country codes, see [Appendix A](#appendix-a) in order to see how to parse it.)

**GET Params**
None

**POST Params**
operation:"nationalList",
isRoleBased:false,
isRightMenu:false,
alumniHome:false,
committeeName:"cmtId",
allRequired:false,
isAllCheckReq:false,
isInactiveCommitteeReq:false,
isReport:false,
allCheckBox:false,
gnFlag:1,
mcFlag:1,
passFlag:0

## <a name="#scope"></a> /exchange/browseintern.do

> Browse Internships (Both EP's and TN's)

**GET Params**
operation:BrowseInternSearchResult
page:1
program:browse

**POST Params**
statusid:9
buttontype:
countrycode:
orgsearchtext:
date_from:14.06.2012
date_to:14.06.2013
questiontext:
browsetype:tn
xchangetype:GI
tncode:
getTN:gepTN
status:-1

### Fields description

#### operation
Most of the time is the basic commands sent to a specific servlet inside the system. Given for instance *test.do*, the pattern followed here is similar to a command pattern, where the server has a list of pre recorded expected requests and provides an answer to them.

Current Requests: ["BrowseInternSearchResult"]

#### page
The id of the container that holds a given records after a specific query. Here we can assume there's a SQL database behind the layer and this parameter provides input some sort of Cursor or ORDER BY statement.

Current Requests: [1,2,3,4,...,48,49,50]

#### browse
[On research]

#### statusid
[On research]

#### buttontype
[On research]

#### countrycode
[On research] It seems this countrycode is different than the contentscope.do uses, you can't browse by country only, buy need a subid too. 


# Appendix A: Parser Codes

## Retrieve list of national keys and values from a contentscope.do national request.
> From js/libs/aiesec/parser/parser.js

```javascript
		self.parseObjectNationalList = function(html) {
			var dom = $('<html>').html(html);
			var parsedObject = {};
			$.each(dom.find('select option'), function(i, v) {
				parsedObject[$(v).val()] = $(v).html();
			});
			return parsedObject;
		}
```

## Retrieve browse intern list

```javascript
var POSTdata  = {
	statusid:9,
	buttontype:null,
	countrycode:null,
	orgsearchtext:null,
	date_from:"15.06.2012",
	date_to:"15.06.2013",
	questiontext:null,
	browsetype:"tn",
	xchangetype:0,
	tncode:null,
	getTN:"gepTN",
	status:-1,
	duration_from:6,
	duration_to:78
}

var GETdata  = "?operation=BrowseInternSearchResult&page=1&program=browse"
var URL = "/exchange/browseintern.do"

var params = {
	url: "http://www.myaiesec.net"+URL+GETdata,
	data: POSTdata,
	type: "POST"				
}
```