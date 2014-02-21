var App = (function() {

	return {

		connect: function(method, location, callback){

			var request = new XMLHttpRequest(),
				response;

			request.open(method, location, false);
			request.send();

			if (request.status === 200) {

				response = request.responseText;

			}

			return {

				respond: function() {

					return response;

				},

				custom: callback || function() {

					return this;

				}

			}

		},

		checkData : function(data, subData){

				if (data || data[subData]){

					return true;

				}else{

					return false;

				}

		},

		loop : function() { //things to be done on start? may remove images

			/*var elements = document.querySelectorAll("div"),
				elArray = [];*/

			var images = document.querySelectorAll("img");

			for (var i = 0, l = images.length; i < l; i++) {

				if (images[i].getAttribute("data-src")){

					images[i].src = images[i].getAttribute("data-src");

				}

			}

			/*for (var i = 0, l = elements.length; i < l; i++) {

				elArray.push([elements[i], elements[i].getAttribute("data-type")]);

			}*/
			return images;

		},

		cloneItem : function(element, tags, data){

			function duplicateItem(elem, increment, data){
				var dupe = elem.cloneNode(true),
					dataElements = dupe.querySelectorAll("[data-data]"),
					dupeTags = [],
					tempName = "";

					for(var i = 0, l = dataElements.length; i < l; i++) {

						if (dataElements[i].tagName != tempName){

							tempName = dataElements[i].tagName;
							dupeTags.push(dataElements[i].tagName);

						}

					}
				//console.log(dupeTags);
				App.populateItem("all", data[increment], dupe, dupeTags);

				return dupe;

			}

			function setEach(tag){

				var innerElements = element.querySelectorAll(tag),
					dupe,
					number,
					toAppend = document.createDocumentFragment();

				for (var i = 0, l = innerElements.length; i < l; i++) {

					if (innerElements[i].getAttribute("data-multiple") && App.checkData(data)){

						App.populateItem("all", data[0], innerElements[i], ["[data-data]"]);//change from div

						number = innerElements[i].getAttribute("data-multiple")|0;

						for (var j = 1; j < number; j++) {

							toAppend.appendChild(duplicateItem(innerElements[i], j, data));

						}

						/*innerElements[i]*/
						element.appendChild(toAppend);

					}


				}

			}

			for (var i = 0, l = tags.length; i < l; i++) {

				setEach(tags[i]);

			}

		},

		generateItem : function(type, data, element, def) {
			//add generation for elements created in markup
				//this would use something like data-times to copy it and make more
				//migt make this something else, not under generate

			function generateList(data, item){

				var ul = document.createElement("ul"),
					li;

				if (data === undefined && def === true) {

					data = ['data not found'];

				}

				for (var i = 0, l = data.length; i < l; i++) {

					li = document.createElement("li");
					li.innerHTML = data[i];

					ul.appendChild(li);

				}

				element.appendChild(ul);

			}

			switch(type){

				case "list" :
					generateList(data, element);
					break;
				/*case "default" :
					generateDefault(data, element, types);
					break;*/

			}


		},

		populateItem :  function(type, data, element, tags){

			function populateAll(data, item, tags){
				var eachType = [];
				var ArrConv;

				function convert(nodelist, type){
					var array = [];
					var finishedArray = [];
					for (var i = 0, l = nodelist.length; i < l; i++) {

						array.push(nodelist[i]);

					}
					finishedArray.push(type);
					finishedArray.push(array);

					return finishedArray;

				}

				function setEach(ofEach){

					for (var i = 0, l = ofEach.length; i < l; i++) {

						if (ofEach[i].getAttribute("data-data") && App.checkData(data, ofEach[i].getAttribute("data-data"))){
//herehere

							ofEach[i].innerHTML = data[ofEach[i].getAttribute("data-data")]; //need to cover data not recovered
						}

					}

				}

				for (var i = 0, l = tags.length; i < l; i++){

					//element.querySelectorAll(tags[i]);
					eachType.push(convert(element.querySelectorAll(tags[i]), tags[i]));

					//making search through types, get data attributes

				}

				for (var i = 0, l = eachType.length; i < l; i++) {

					setEach(eachType[i][1]);

				}

			}

			switch(type){

				case "all" :
					populateAll(data, element, tags);

					break;
				/*case "default" :
					generateDefault(data, element, types);
					break;*/

			}

		}

	}

	//loop();

})();
