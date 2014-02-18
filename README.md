##Structure of documents

index 

1. paragraph explaining how the list is formed
2. the div tag to be populated by the list

3. paragraph explaining how the following div has its items populated this includes:
	1. a paragraph populated by data.js
	2. a paragraph explaining the above
	3. the following `<p>` and `<div>` tags are also populated by data.js
	
builder.js

1. This is the background to how things are populated

script.js

1. App.loop() just creates an array of all elements on the page - this is currently not necessary
2. Two variables that are document items to be used in generating and populating elements.
3. dataGrabber gets the information from data.js
4. A check if this information is undefined or not
	1. Parsing this JSON
5. `generateItem()` creates an item
	1. in this case a "list" as depicted by the first argument. 
	2. `dataGrabber["list"]` is what data within the returned information is used
	3. `numlist` is the element this cycles through
	4. true sets some defualt "data not found" information if the XHR request fails
6. `populateItem()` cycles through the elements defined in the last argument to populate them
	1. "all" will cycle through all the given elements, no extra requirements, this is the only choice right now
	2. `dataGrabber["default"]` gets the `default` item from data.js this information is applied according to the `data-data` attribute on each item
	3. "defaultTest" is what item to cycle through
	4. `["p", "div"]` tells it to look for all `<p>` and `<div>` tags, this can be set to any other elements as well
	

**more to come**


