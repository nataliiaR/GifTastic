    // Adding click event listen listener to all buttons
    $("button").on("click", function() {
        // Grabbing and storing the data-animal property value from the button
        var animal = $(this).attr("data-animal");
  
        // Constructing a queryURL using the animal name
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
          animal + "&api_key=rhzLqNLrZ7015b57CwgKM91URwHAduDY&limit=10";
  
        // Performing an AJAX request with the queryURL
        $.ajax({
          url: queryURL,
          method: "GET"
        })
          // After data comes back from the request
          .then(function(response) {
  
            create(response);
      });
    });

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

  // .on("click") function associated with the Search Button
  $("#run-search").on("click", function(event) {
    // This line allows us to take advantage of the HTML "submit" property
    // This way we can hit enter on the keyboard and it registers the search
    // (in addition to clicks). Prevents the page from reloading on form submit.
    event.preventDefault();
    clear();
    var animal = $('#searchGiff').val();
    console.log("animal "+ animal);
  
    // Constructing a queryURL using the animal name
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      animal + "&api_key=rhzLqNLrZ7015b57CwgKM91URwHAduDY&limit=10";
  
    // Make the AJAX request to the API - GETs the JSON data at the queryURL.
    // The data then gets passed as an argument to the updatePage function
    $.ajax({
        url: queryURL,
        method: "GET"
      })
        // After data comes back from the request
        .then(function(response) {

          create(response);
    });
});
  
  function create(response){

    // storing the data from the AJAX request in the results variable
    var results = response.data;
    
    // Looping through each result item
    for (var i = 0; i < results.length; i++) {
    
      // Creating and storing a div tag
      var animalDiv = $("<div>");
    
      // Creating a paragraph tag with the result item's rating
      var p = $("<p>").text("Rating: " + results[i].rating);
    
      // Creating and storing an image tag
      var animalImage = $("<img>");
      // Setting the src attribute of the image to a property pulled off the result item
      animalImage.attr("src", results[i].images.fixed_height_still.url);
      animalImage.attr("data-still",results[i].images.fixed_height_still.url);
      animalImage.attr("data-animate",results[i].images.fixed_height.url);
      animalImage.attr("data-state","still");
      animalImage.attr("class","gif");
      animalImage.attr("onclick","clickGiff(this)");
    
      // Appending the paragraph and image tag to the animalDiv
      animalDiv.append(p);
      animalDiv.append(animalImage);
    
      // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
      $("#gifs-appear-here").append('<div class="col-md-4>"').prepend(animalDiv);
    }
    }

    function clear(){
        $("#gifs-appear-here").empty();
    }

  