var App = (function() {

	var dataList = ["one", "two", "three", "four"];

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

		generateItem : function(type, data, element, def, types){

					function generateList(data, item){

						if (data === undefined && def === true){

							data = ['data not found'];

						}

						var ul = document.createElement("ul");

						for (var i = 0, l = data.length; i < l; i++) {

							var li = document.createElement("li");
							li.innerHTML = data[i];

							ul.appendChild(li);

						}

						element.appendChild(ul);

					}

					function generateDefault(data, item, types){
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

								console.log(ofEach[i].getAttribute("data-data"));

								ofEach[i].innerHTML = data[ofEach[i].getAttribute("data-data")];

							}

						}

						for (var i = 0, l = types.length; i < l; i++){

							element.querySelectorAll(types[i]);
							eachType.push(convert(element.querySelectorAll(types[i]), types[i]));

							//making search through types, get data attributes

						}

						for (var i = 0, l = eachType.length; i < l; i++) {

							setEach(eachType[i][1]);

						}

					}


					switch(type){

						case "list" :
							generateList(data, element);
							break;
						case "default" :
							generateDefault(data, element, types);
							break;

					}


				}

	}

	//loop();

})();
