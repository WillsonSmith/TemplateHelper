function TemplateHelper() {

	function checkData(data, subData){

			if (data || data[subData]){

				return true;

			}else{

				return false;

			}

	};

	return {

		cloneItem : function(element, tags, data) {

			function duplicateItem(elem, increment, data) {

				var dupe = elem.cloneNode(true),
					dataElements = dupe.querySelectorAll("[data-data]"),
					dupeTags = [],
					tempName = "";

					for(var i = 0, l = dataElements.length; i < l; i++) {

						if (dataElements[i].tagName != tempName) {

							tempName = dataElements[i].tagName;
							dupeTags.push(dataElements[i].tagName);

						}

					}
				//console.log(dupeTags);

				this.populateItem("all", data[increment], dupe, dupeTags);

				return dupe;

			}

			function setEach(tag){

				var innerElements = element.querySelectorAll(tag),
					dupe,
					number,
					toAppend = document.createDocumentFragment();

				for (var i = 0, l = innerElements.length; i < l; i++) {

					if (innerElements[i].getAttribute("data-multiple") && checkData(data)) {

						this.populateItem("all", data[0], innerElements[i], ["[data-data]"]);//change from div

						number = innerElements[i].getAttribute("data-multiple")|0;

						for (var j = 1; j < number; j++) {

							toAppend.appendChild(duplicateItem.apply(this, [innerElements[i], j, data]));

						}

						/*innerElements[i]*/
						element.appendChild(toAppend);

					}


				}

			}

			for (var i = 0, l = tags.length; i < l; i++) {

				setEach.call(this, tags[i]);

			}

		},

		//change to create
		createItem : function(type, data, element, def) {
			//add generation for elements created in markup
				//this would use something like data-times to copy it and make more
				//migt make this something else, not under generate

			function generateItem(data, element) {

				var sparse = document.createDocumentFragment(),
					newEl;

				if (data === undefined && def === true) {

					data = ['data not found'];

				}

				for (var i = 0, l = data.length; i < l; i++) {

					newEl = document.createElement(type);
					newEl.innerHTML = data[i];

					sparse.appendChild(newEl);

				}

				element.appendChild(sparse);

			}

			generateItem(data, element);

		},

		populateItem :  function(type, data, element, tags) {

			function populateAll(data, item, tags) {

				var eachType = [];
				var ArrConv;

				function convert(nodelist, type) {

					var array = [];
					var finishedArray = [];
					for (var i = 0, l = nodelist.length; i < l; i++) {

						array.push(nodelist[i]);

					}

					finishedArray.push(type);
					finishedArray.push(array);

					return finishedArray;

				}

				function setEach(ofEach) {

					var eachData;
					for (var i = 0, l = ofEach.length; i < l; i++) {
						data = ofEach[i].getAttribute("data-data");

						if (eachData && checkData(data, eachData)) {
//herehere

							ofEach[i].innerHTML = data[ofEach[i].getAttribute("data-data")]; //need to cover data not recovered
						}

					}

				}

				for (var i = 0, l = tags.length; i < l; i++) {

					//element.querySelectorAll(tags[i]);
					eachType.push(convert(element.querySelectorAll(tags[i]), tags[i]));

					//making search through types, get data attributes

				}

				for (i = 0, l = eachType.length; i < l; i++) {

					setEach(eachType[i][1]);

				}

			}

			if (type === "all") {

				populateAll(data, element, tags);

			}

		}

	};

	//loop();

}
