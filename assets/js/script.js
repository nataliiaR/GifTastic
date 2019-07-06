
var listOfDefaultGIFButtons = ["My favorite","America","Africa","Europe","Australia"];
var gifListLocalStorage = JSON.parse(localStorage.getItem('gifButtons'));
var favoriteGif = JSON.parse(localStorage.getItem('gifFavorites'));
var limit =10;
var offset=0;

if(!Array.isArray(favoriteGif)) {
  favoriteGif = [];
}
if(!Array.isArray(gifListLocalStorage)) {
  gifListLocalStorage = [];
}


function renderGIFButtons(gifListLocalStorage,listOfDefaultGIFButtons ) {
 
  for(let i = 0; i < listOfDefaultGIFButtons.length; i++) {
    let gifButton = $('<button class="btn btn-primary giff">');
    gifButton.attr("data-gif",listOfDefaultGIFButtons[i]);
    if (listOfDefaultGIFButtons[i]==="My favorite"){
      gifButton.attr("onclick","showFavorite()");
      gifButton.css("background-color","pink");
    }
    else{
      gifButton.attr("onclick","rungiffSearch(this)");
    }

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

function rungiffSearch(el){

  var gif = $(el).attr("data-gif");

  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
  gif + "&api_key=rhzLqNLrZ7015b57CwgKM91URwHAduDY"+"&limit="+limit+"&offset="+offset;


  $.ajax({
    url: queryURL,
    method: "GET"
  })
  .then(function(response) {
    create(response);      
  });

  offset=offset+limit+1;
}

function clickGiff(el) {

  var state = $(el).attr("data-state");

  if (state === "still") {
    $(el).attr("src", $(el).attr("data-animate"));
    $(el).attr("data-state", "animate");
  } else {
    $(el).attr("src", $(el).attr("data-still"));
    $(el).attr("data-state", "still");
  }
}


$("#run-search").on("click", function(event) {

  event.preventDefault();

  if($('#searchGiff').val().trim() !==""){

    var gif = $('#searchGiff').val().trim();
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

  var results = response.data;

  for (var i = 0; i < results.length; i++) {

    var gifDiv = $("<div class='gifDiv col-xs-12 col-sm-6 col-md-3 col-lg-3'>");

    var rating = $("<p>").text("Rating: " + results[i].rating);
    var title = $("<p class='favorite-title'>").text("Title: " + results[i].title);
    var addFavorite = $("<button class='btn btn-primary favorite' onclick='addToFavorite(this)'>");
    addFavorite.text("Add to favorite");
    addFavorite.css("background-color","pink");
    var gifImage = $("<img>");

    gifImage.attr("src", results[i].images.fixed_height_still.url);
    gifImage.attr("data-still",results[i].images.fixed_height_still.url);
    gifImage.attr("data-animate",results[i].images.fixed_height.url);
    gifImage.attr("data-state","still");
    gifImage.attr("class","gifImage");
    gifImage.attr("onclick","clickGiff(this)");


    gifDiv.append(gifImage);
    gifDiv.append(rating);
    gifDiv.prepend(title);
    gifDiv.append(addFavorite);
    $("#gifs-appear-here").append('<div class="col-md-4>"').prepend(gifDiv);
    $("#clear-section").css("display","block");
  }
}

function showFavorite(){
  clear();

  for (var j=0; j<favoriteGif.length; j++){
    var divFromFavStorage  = $("<div class='gifDiv col-xs-12 col-sm-6 col-md-3 col-lg-3'>");

    divFromFavStorage.html(favoriteGif[j]);

    console.log ( "favoriteGif[j] "+favoriteGif);
    $("#gifs-appear-here").append(divFromFavStorage);
    $(".favorite").css("display","none");
  }

}

function addToFavorite(el){

  var objectDiv = $(el).parent().html();

  console.log("objectDiv"+objectDiv);

  favoriteGif.push(objectDiv);

  localStorage.setItem('gifFavorites', JSON.stringify(favoriteGif));
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

  