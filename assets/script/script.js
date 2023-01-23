var lat;
var lon;

searchButton = $("#search-button");

function getCoord() {
  // Here we are building the URL we need to query the database
  var APIKey = "9d4fe5adab147e88d86d852e4a84701e";
  query = $("#search-input").val().trim();
  var queryURL =
    "http://api.openweathermap.org/geo/1.0/direct?q=" +
    query +
    "&limit=1&appid=" +
    APIKey;
  console.log(queryURL);
  return queryURL;
}

function get5Day() {
  // Here we are building the URL we need to query the database
  var APIKey = "9d4fe5adab147e88d86d852e4a84701e";

  var queryURL =
    "http://api.openweathermap.org/data/2.5/forecast?lat=" +
    lat +
    "&lon=" +
    lon +
    "&appid=" +
    APIKey;

  console.log("5day " + queryURL);
  return queryURL;
}

searchButton.on("click", function (event) {
  // This line allows us to take advantage of the HTML "submit" property
  // This way we can hit enter on the keyboard and it registers the search
  // (in addition to clicks). Prevents the page from reloading on form submit.
  event.preventDefault();

  // Empty the region associated with the articles
  // clear();

  // Build the query URL for the ajax request to the `Geocoder API
  var coordURL = getCoord();

  // Make the AJAX request to the API - GETs the JSON data at the queryURL.
  // The data then gets passed as an argument to the updatePage function
  $.ajax({
    url: coordURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);

    lat = response[0].lat;
    lon = response[0].lon;

    var fiveDayURL = get5Day();

    // Make the AJAX request to the API - GETs the JSON data at the queryURL.
    // The data then gets passed as an argument to the updatePage function
    $.ajax({
      url: fiveDayURL,
      method: "GET",
    }).then(function (response) {
      console.log(response);
    });
  });
});
