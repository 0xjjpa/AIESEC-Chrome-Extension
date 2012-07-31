/* A user should be able to create TN's Filter Searches */
module("TN Filter Search Bootstrap", {
  setup: function() {
  	var AIESECModule = new window.aiesec(ko, $);
  	window._TNFilterSearch = new AIESECModule.TNFilterSearch();
  },  
  teardown: function() {
    delete window._TNFilterSearch;
  }
});

test("Reviews properties of the TN Filter Search", function() {  

  var TNFS = window._TNFilterSearch;
  equal("object", typeof TNFS, "TNFilterSearch created.");

  equal("object", typeof TNFS.searchScope(), "Search Scope property exists..");
  equal("object", typeof TNFS.typeOfInternship(), "Intership type array exists.");

  deepEqual(TNFS.typeOfInternship(), ["GCDP", "GIP"], "Type of Intership can only be GCDP or GIP");

  equal("number", typeof TNFS.startDuration(), "TNFilterSearch has a start date.");  
  ok(TNFS.startDuration() >= 6 && TNFS.startDuration() < 78, "TNFilterSearch start date is at least 6 weeks and less than 72.");

  equal("number", typeof TNFS.endDuration(), "TNFilterSearch has an end date.");
  ok(TNFS.endDuration() <= 78 && TNFS.endDuration() >= 6, "TNFilterSearch has an end date with a max of 72 weeks and minimum of 6.");

  ok(TNFS.startDuration() <= TNFS.endDuration(), "TNFilter Search start date is lower than the end date");

  equal("object", typeof TNFS.searchAreas(), "TNFilterSearch has an array of areas.");
});
