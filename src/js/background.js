//regExMyAIESEC = new RegExp(/http:\/\/www.myaiesec.net\/./);
regExMyAIESEC = new RegExp(/http:\/\/www.myaiesec.net\//);
		
// Listen for any changes to the URL of our tab
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  var match = regExMyAIESEC.exec(tab.url);
  if(match) { // To make sure we only affect myaiesec windows.	
	chrome.pageAction.show(tab.id);	   
  }
});			