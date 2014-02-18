(function(){

App.loop();

	var numList = document.getElementById("numberList");
	var defaultTest = document.getElementById("defaultTest");

	var dataGrabber = new App.connect("GET", "js/data.js");

	if (dataGrabber.respond() !== undefined){

		dataGrabber = JSON.parse(dataGrabber.respond());

	}

	App.generateItem("list", dataGrabber.list, numList, true);


	App.generateItem("default", dataGrabber.list, defaultTest, false, ["span"]);


})();
