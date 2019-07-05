  var listOfDefaultGIFButtons = ["America","Africa","Europe","Australia"];
  var gifListLocalStorage = JSON.parse(localStorage.getItem('gifButtons'));

    if(!Array.isArray(gifListLocalStorage)) {
      gifListLocalStorage = [];
    }

    function renderGIFButtons(list,listOfDefaultGIFButtons ) {
      //$('.album').empty();
      for(let i = 0; i < listOfDefaultGIFButtons.length; i++) {
        let gifButton = $('<button class="btn btn-primary giff">');
        gifButton.attr("data-gif",listOfDefaultGIFButtons[i]);
        gifButton.attr("onclick","rungiffSearch(this)")
        gifButton.text(listOfDefaultGIFButtons[i][0].toUpperCase()+listOfDefaultGIFButtons[i].substr(1));
        $(".button_group").append(gifButton);
      }
      for(let i = 0; i < gifListLocalStorage.length; i++) {
        let gifButton = $('<button class="btn btn-primary giff">');
        gifButton.attr("data-gif",gifListLocalStorage[i]);
        gifButton.attr("onclick","rungiffSearch(this)")
        gifButton.text(gifListLocalStorage[i][0].toUpperCase()+gifListLocalStorage[i].substr(1));
        $(".button_group").append(gifButton);
      }
    }
    renderGIFButtons(gifListLocalStorage,listOfDefaultGIFButtons);


    // Adding click event listen listener to all buttons
    $("button.giff").on("click", function() {
        rungiffSearch(this);
    });

    function rungiffSearch(el){
                // Grabbing and storing the data-animal property value from the button
                var gif = $(el).attr("data-gif");
  
                // Constructing a queryURL using the animal name
                var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
                  gif + "&api_key=rhzLqNLrZ7015b57CwgKM91URwHAduDY&limit=10";
          
                // Performing an AJAX request with the queryURL
                $.ajax({
                  url: queryURL,
                  method: "GET"
                })
                  // After data comes back from the request
                  .then(function(response) {
          
                    create(response);
                   
                    
              });
    }

      function clickGiff(el) {
   
        console.log("DO I GET HERE?")
        // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
        var state = $(el).attr("data-state");
        console.log("state? "+state);
        // If the clicked image's state is still, update its src attribute to what its data-animate value is.
        // Then, set the image's data-state to animate
        // Else set src to the data-still value
        if (state === "still") {
          $(el).attr("src", $(el).attr("data-animate"));
          $(el).attr("data-state", "animate");
        } else {
          $(el).attr("src", $(el).attr("data-still"));
          $(el).attr("data-state", "still");
        }
      }
      var arrayFromStorage = [];
  // .on("click") function associated with the Search Button

  $("#run-search").on("click", function(event) {

    // This line allows us to take advantage of the HTML "submit" property
    // This way we can hit enter on the keyboard and it registers the search
    // (in addition to clicks). Prevents the page from reloading on form submit.
    event.preventDefault();

    if($('#searchGiff').val() !==""){
   
    var gif = $('#searchGiff').val();
    var newButton =$('<button class="btn btn-primary giff">');
    newButton.attr("data-gif",gif);
    newButton.text(gif);
    newButton.attr("onclick","rungiffSearch(this)")
    $(".button_group").append(newButton);

    $('#searchGiff').val("");
  
    gifListLocalStorage.push(gif);

    localStorage.setItem('gifButtons', JSON.stringify(gifListLocalStorage));

    }
});
  


  function create(response){

    // storing the data from the AJAX request in the results variable
    var results = response.data;
    
    // Looping through each result item
    for (var i = 0; i < results.length; i++) {
    
      // Creating and storing a div tag
      var gifDiv = $("<div>");
    
      // Creating a paragraph tag with the result item's rating
      var p = $("<p>").text("Rating: " + results[i].rating);
    
      // Creating and storing an image tag
      var gifImage = $("<img>");
      // Setting the src attribute of the image to a property pulled off the result item
      gifImage.attr("src", results[i].images.fixed_height_still.url);
      gifImage.attr("data-still",results[i].images.fixed_height_still.url);
      gifImage.attr("data-animate",results[i].images.fixed_height.url);
      gifImage.attr("data-state","still");
      gifImage.attr("class","gif");
      gifImage.attr("onclick","clickGiff(this)");
    
      // Appending the paragraph and image tag to the animalDiv
      gifDiv.append(p);
      gifDiv.append(gifImage);
    
      // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
      $("#gifs-appear-here").append('<div class="col-md-4>"').prepend(gifDiv);
      $("#clear-section").css("display","block");
    }
    }

    function clear(){
        $("#gifs-appear-here").empty();
        $("#clear-section").css("display","none");
    }

 

    $("#clear-section").on("click", function(){
        clear();
    });

    $(".giff").on("hover", function(){
        $(".giff").append("delete-button").css("display","inline-block");

        $("#delete-button").on("click",function(){
            $(".giff").css("display","none");

        });
    });

  