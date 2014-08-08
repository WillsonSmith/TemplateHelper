(function(){

//App.loop();



  function connect(method, location, callback) {

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

    };

  }

  var numList = document.getElementById("numberList"),
  listTwo = document.getElementById("listTwo"),
  defaultTest = document.getElementById("defaultTest"),
  duplicate = document.getElementById("multipleContainer"),
  dataGrabber = connect("GET", "js/data.js");

  var App = new TemplateHelper();

  if (dataGrabber.respond() !== undefined){

    dataGrabber = JSON.parse(dataGrabber.respond());

  }

  App.createItem("li", dataGrabber.list, numList, true);
  App.createItem("section", dataGrabber.list, listTwo, true);

  App.populateItem("all", dataGrabber.default, defaultTest, ["p", "div"]);

  App.cloneItem(duplicate, ["div"], dataGrabber.multiple);

})();
