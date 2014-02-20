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

		loop : function() {

			var elements = document.querySelectorAll("div"),
				elArray = [];


			for (var i = 0, l = elements.length; i < l; i++) {

				elArray.push([elements[i], elements[i].getAttribute("data-type")]);

			}
			return elArray;

		},

		cloneItem : function(element, tags, data){
			//add data option, if data-multiple = "true" then use that data, else just make many
			//how to handle data incrementally?

			function duplicateItem(elem, increment, data){
				var dupe = elem.cloneNode(true);

				var dataItems = dupe.querySelectorAll(["data-data"]);

				console.log(data[increment], increment);
				App.populateItem("all", data[increment], dupe, ["div"]);

				return dupe;

			}

			function setEach(tag){

				var innerElements = element.querySelectorAll(tag),
					dupe,
					number,
					toAppend = document.createDocumentFragment();

				for (var i = 0, l = innerElements.length; i < l; i++) {

					if (innerElements[i].getAttribute("data-multiple")){

						number = innerElements[i].getAttribute("data-multiple")|0;

						for (var j = 0; j < number; j++) {

							toAppend.appendChild(duplicateItem(innerElements[i], j, data));

						}

						innerElements[i].appendChild(toAppend);

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

						if (ofEach[i].getAttribute("data-data")){
							ofEach[i].innerHTML = data[ofEach[i].getAttribute("data-data")];
						}

					}

				}

				for (var i = 0, l = tags.length; i < l; i++){

					element.querySelectorAll(tags[i]);
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
