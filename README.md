# AIESEC TN Look Up Tool
@by [jjperezaguinaga](http://im.jjperezaguinaga.com)

*Description* Google Chrome extension to help improve the experience of AIESEC Members inside MyAiesec.net.

*Documentation* Documentation is wrote in [YuiDocs](http://yui.github.com/yuidoc/) Syntax. To get docs run:
	yuidoc .


# AIESEC Scrapping Research

In order to properly develop a tool that correctly browses the information Users require, a scrapping research is being performed at main sections of the webpage. The following is a list of some basic queries that can be performed in the system with the proper parameters.


## Browse Internships (Both EP's and TN's)

> /exchange/browseintern.do

**Default GET Params**
operation:BrowseInternSearchResult
page:1
program:browse

**Default POST Params**
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




status: -1 = New