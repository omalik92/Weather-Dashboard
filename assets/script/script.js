var lat;
var lon;
var query;
//variables to store the temp, wind and humidity data retreived from openweather
var day0 = { icon: [], temp: [], wind: [], humidity: [] };
var day1 = { icon: [], temp: [], wind: [], humidity: [] };
var day2 = { icon: [], temp: [], wind: [], humidity: [] };
var day3 = { icon: [], temp: [], wind: [], humidity: [] };
var day4 = { icon: [], temp: [], wind: [], humidity: [] };
var day5 = { icon: [], temp: [], wind: [], humidity: [] };

searchButton = $("#search-button");
weatherCards = $("#weather-cards");

//create an init function

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
    APIKey +
    "&units=metric";

  console.log("5day " + queryURL);
  return queryURL;
}
//function to sort data into days for the purposes of averaging the data
function sort(response) {
  for (i = 0; i < response.list.length; i++) {
    if (
      moment.unix(response.list[i].dt).format("DD/MM/YYYY") ==
      moment().format("DD/MM/YYYY")
    ) {
      day0.icon.push(response.list[i].weather[0].icon);
      day0.temp.push(response.list[i].main.temp);
      day0.wind.push(response.list[i].wind.speed);
      day0.humidity.push(response.list[i].main.humidity);
    } else if (
      moment.unix(response.list[i].dt).format("DD/MM/YYYY") ==
      moment().add(1, "d").format("DD/MM/YYYY")
    ) {
      day1.icon.push(response.list[i].weather[0].icon);
      day1.temp.push(response.list[i].main.temp);
      day1.wind.push(response.list[i].wind.speed);
      day1.humidity.push(response.list[i].main.humidity);
    } else if (
      moment.unix(response.list[i].dt).format("DD/MM/YYYY") ==
      moment().add(2, "d").format("DD/MM/YYYY")
    ) {
      day2.icon.push(response.list[i].weather[0].icon);
      day2.temp.push(response.list[i].main.temp);
      day2.wind.push(response.list[i].wind.speed);
      day2.humidity.push(response.list[i].main.humidity);
    } else if (
      moment.unix(response.list[i].dt).format("DD/MM/YYYY") ==
      moment().add(3, "d").format("DD/MM/YYYY")
    ) {
      day3.icon.push(response.list[i].weather[0].icon);
      day3.temp.push(response.list[i].main.temp);
      day3.wind.push(response.list[i].wind.speed);
      day3.humidity.push(response.list[i].main.humidity);
    } else if (
      moment.unix(response.list[i].dt).format("DD/MM/YYYY") ==
      moment().add(4, "d").format("DD/MM/YYYY")
    ) {
      day4.icon.push(response.list[i].weather[0].icon);
      day4.temp.push(response.list[i].main.temp);
      day4.wind.push(response.list[i].wind.speed);
      day4.humidity.push(response.list[i].main.humidity);
    } else if (
      moment.unix(response.list[i].dt).format("DD/MM/YYYY") ==
      moment().add(5, "d").format("DD/MM/YYYY")
    ) {
      day5.icon.push(response.list[i].weather[0].icon);
      day5.temp.push(response.list[i].main.temp);
      day5.wind.push(response.list[i].wind.speed);
      day5.humidity.push(response.list[i].main.humidity);
    }
  }
}

function average(arr) {
  arr.reduce((a, b) => a + b, 0) / arr.length;
}

function getMode(array) {
  // count amount of occurences of each number

  // create object
  const obj = {};
  // loop over array
  array.forEach((number) => {
    // for each number in array,
    // if it doesn't already exist as a key on the
    // object, create one and set its value to 1.
    if (!obj[number]) {
      obj[number] = 1;
    } else {
      // if it already exists as key on the object,
      // increment its corresponding value.
      obj[number] += 1;
    }
  });

  // return object key with highest value.
  let highestValue = 0;
  let highestValueKey = -Infinity;

  for (let key in obj) {
    const value = obj[key];
    if (value > highestValue) {
      highestValue = value;
      highestValueKey = key;
    }
  }

  // convert key back to number
  return highestValueKey;
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

      sort(response);

      //for loop to update all the required elements for weather
      var cityName = response.city.name;

      $("#today")
        .children()
        .eq(0)
        .text(`${cityName} (${moment().format("DD/MM/YYYY")})`);

      //
      console.log(getMode(day0.icon));
      console.log(day0);
      console.log(day1);
      console.log(day2);
      console.log(day3);
      console.log(day4);
      console.log(day5);
    });
  });
});
