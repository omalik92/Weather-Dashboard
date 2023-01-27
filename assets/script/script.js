//initialising variables in the global scope
var lat;
var lon;
var query;
var cityName;
var searchHistory = [];
//variables to store the temp, wind and humidity data retreived from openweather
var day0 = { icon: [], temp: [], wind: [], humidity: [] };
var day1 = { icon: [], temp: [], wind: [], humidity: [] };
var day2 = { icon: [], temp: [], wind: [], humidity: [] };
var day3 = { icon: [], temp: [], wind: [], humidity: [] };
var day4 = { icon: [], temp: [], wind: [], humidity: [] };
var day5 = { icon: [], temp: [], wind: [], humidity: [] };
//array of 5 days not including today
var days = [day1, day2, day3, day4, day5];
//array of all days including today
var allDays = [day0, day1, day2, day3, day4, day5];
//Jquery element selectors to be used in the script
searchButton = $("#search-button");
weatherCards = $("#weather-cards");
//calling the initialise function to load the starting page
init();
//calling the render history buttons function
renderHistory();
//below function get the search history from local storage and loads the last search to the page
function init() {
  searchHistory = JSON.parse(localStorage.getItem("searchHistory"));
  if (searchHistory !== null) {
    cityName = searchHistory[0].city;
    lat = searchHistory[0].lat;
    lon = searchHistory[0].lon;
    $("#search-input").attr("placeholder", cityName);
    var fiveDayURL = get5Day();
    $.ajax({
      url: fiveDayURL,
      method: "GET",
    }).then(function (response) {
      // console.log(response);

      sort(response);

      updateHTML(response);
      //unhides the 5 day weather within sections
      $("section").removeClass("hidden");

      clearData();
    });
  } else {
    //if nothing is avialble in local storage, as it may be the first run of the page
    //set searchHistory to an empty string
    searchHistory = [];
  }
}
//function to render search history buttons to page
//note the event listener will not attach to buttons once re-rendered if it not called within the function as shown below
function renderHistory() {
  if (searchHistory.length !== 0) {
    for (i = 0; i < searchHistory.length; i++) {
      button = $("<button>");
      button.attr(
        "class",
        "btn btn-secondary w-100 mt-2 mb-1 search-button btn-block"
      );
      button.attr("id", "search-button");
      button.data("lat", searchHistory[i].lat);
      button.data("lon", searchHistory[i].lon);
      button.text(searchHistory[i].city);
      $("#history").append(button);
    }
    //event lister for buttons mush be added here so it is re-attached each time the buttons are rendered
    $("#history")
      .children("button")
      .on("click", function (event2) {
        selected = $(event2.target);
        // console.log(selected);
        lat = selected.data("lat");
        lon = selected.data("lon");
        var fiveDayURL = get5Day();
        $.ajax({
          url: fiveDayURL,
          method: "GET",
        }).then(function (response) {
          // console.log(response);

          sort(response);

          updateHTML(response);
          clearData();
        });
      });
  }
}
//function to get co-ordinates

function getCoord() {
  // Here we are building the URL we need to query open weather for co-ordinates of our city
  var APIKey = "9d4fe5adab147e88d86d852e4a84701e";
  //gets value of search input
  query = $("#search-input").val().trim();
  var queryURL =
    "https://api.openweathermap.org/geo/1.0/direct?q=" +
    query +
    "&limit=1&appid=" +
    APIKey;
  // console.log(queryURL);
  return queryURL;
}
// function to get 5 day URL
function get5Day() {
  // Here we are building the URL to query open weather for the 5 day
  var APIKey = "9d4fe5adab147e88d86d852e4a84701e";

  var queryURL =
    "https://api.openweathermap.org/data/2.5/forecast?lat=" +
    lat +
    "&lon=" +
    lon +
    "&appid=" +
    APIKey +
    "&units=metric";

  // console.log("5day " + queryURL);
  return queryURL;
}
//function to sort data into days for the purposes of getting max values
function sort(response) {
  var format = "hh:mm:ss";
  // var time = moment() gives you current time. no format required.
  //if the time is between 9pm and 12AM use the first data element
  //This prevents no data within the day0 object.
  var time = moment(),
    beforeTime = moment("21:00:00", format),
    afterTime = moment("00:00:00", format);

  if (time.isBetween(beforeTime, afterTime)) {
    day0.icon.push(response.list[0].weather[0].icon);
    day0.temp.push(response.list[0].main.temp);
    day0.wind.push(response.list[0].wind.speed * 2.237);
    day0.humidity.push(response.list[0].main.humidity);
  }
  //the below loop collects data into the corresponding day e.g. 23rd, 24th into day0 and day1 and so forth
  for (i = 0; i < response.list.length; i++) {
    if (
      moment.unix(response.list[i].dt).format("DD/MM/YYYY") ==
      moment().format("DD/MM/YYYY")
    ) {
      day0.icon.push(response.list[i].weather[0].icon);
      day0.temp.push(response.list[i].main.temp);
      day0.wind.push(response.list[i].wind.speed * 2.237);
      day0.humidity.push(response.list[i].main.humidity);
    } else if (
      moment.unix(response.list[i].dt).format("DD/MM/YYYY") ==
      moment().add(1, "d").format("DD/MM/YYYY")
    ) {
      if (response.list[i].weather[0].icon.includes("d")) {
        day1.icon.push(response.list[i].weather[0].icon);
      }

      day1.temp.push(response.list[i].main.temp);
      day1.wind.push(response.list[i].wind.speed * 2.237);
      day1.humidity.push(response.list[i].main.humidity);
    } else if (
      moment.unix(response.list[i].dt).format("DD/MM/YYYY") ==
      moment().add(2, "d").format("DD/MM/YYYY")
    ) {
      if (response.list[i].weather[0].icon.includes("d")) {
        day2.icon.push(response.list[i].weather[0].icon);
      }

      day2.temp.push(response.list[i].main.temp);
      day2.wind.push(response.list[i].wind.speed * 2.237);
      day2.humidity.push(response.list[i].main.humidity);
    } else if (
      moment.unix(response.list[i].dt).format("DD/MM/YYYY") ==
      moment().add(3, "d").format("DD/MM/YYYY")
    ) {
      if (response.list[i].weather[0].icon.includes("d")) {
        day3.icon.push(response.list[i].weather[0].icon);
      }

      day3.temp.push(response.list[i].main.temp);
      day3.wind.push(response.list[i].wind.speed * 2.237);
      day3.humidity.push(response.list[i].main.humidity);
    } else if (
      moment.unix(response.list[i].dt).format("DD/MM/YYYY") ==
      moment().add(4, "d").format("DD/MM/YYYY")
    ) {
      if (response.list[i].weather[0].icon.includes("d")) {
        day4.icon.push(response.list[i].weather[0].icon);
      }

      day4.temp.push(response.list[i].main.temp);
      day4.wind.push(response.list[i].wind.speed * 2.237);
      day4.humidity.push(response.list[i].main.humidity);
    } else if (
      moment.unix(response.list[i].dt).format("DD/MM/YYYY") ==
      moment().add(5, "d").format("DD/MM/YYYY")
    ) {
      day5.icon.push(response.list[i].weather[0].icon);
      day5.temp.push(response.list[i].main.temp);
      day5.wind.push(response.list[i].wind.speed * 2.237);
      day5.humidity.push(response.list[i].main.humidity);
    }
  }
}

// function average(arr) {
//   var sum = 0;
//   for (var i = 0; i < arr.length; i++) {
//     sum += parseInt(arr[i], 10); //don't forget to add the base
//   }

//   var avg = sum / arr.length;
//   return avg;
// }
//function to get the most occuring elemnt within an array
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

  return highestValueKey;
}
//function to clear data from arrays lines 8 to 13 to prevent data aggregating
function clearData() {
  for (i = 0; i < allDays.length; i++) {
    allDays[i].icon.splice(0, allDays[i].icon.length);
    allDays[i].temp.splice(0, allDays[i].temp.length);
    allDays[i].wind.splice(0, allDays[i].wind.length);
    allDays[i].humidity.splice(0, allDays[i].humidity.length);
  }
}
//function to write the required data to the HTML page
function updateHTML(response) {
  //the following sets the weather info for today using Jquery DOM traversal
  //setting todays date and location
  //for loop to update all the required elements for weather
  var cityName = response.city.name;
  $("#today")
    .children()
    .eq(0)
    .text(`${cityName} (${moment().format("DD/MM/YYYY")})`);
  //setting the correct icon
  $("#today")
    .children()
    .eq(1)
    .attr(
      "src",
      "https://openweathermap.org/img/wn/" + getMode(day0.icon) + "@2x.png"
    );
  //setting the max temp for today
  $("#temp").text(`${Math.max(...day0.temp).toFixed(2)} °C`);
  // setting max windspeed for today
  $("#wind").text(` ${Math.max(...day0.wind).toFixed(2)} kph`);
  //setting average humidity for today
  $("#humidity").text(` ${Math.max(...day0.humidity).toFixed(2)}%`);

  // for loop to update all the required elements for weather cards
  for (i = 0; i < days.length; i++) {
    $("#weather-cards")
      .children()
      .eq(i)
      .children()
      .eq(0)
      .children()
      .eq(0)
      .text(
        moment()
          .add(i + 1, "d")
          .format("DD/MM/YYYY")
      );
    $("#weather-cards")
      .children()
      .eq(i)
      .children()
      .eq(0)
      .children()
      .eq(1)
      .attr(
        "src",
        "https://openweathermap.org/img/wn/" + getMode(days[i].icon) + "@2x.png"
      );
    $("#weather-cards")
      .children()
      .eq(i)
      .children()
      .eq(0)
      .children()
      .eq(2)
      .children()
      .text(`${Math.max(...days[i].temp).toFixed(2)} °C`);

    $("#weather-cards")
      .children()
      .eq(i)
      .children()
      .eq(0)
      .children()
      .eq(3)
      .children()
      .text(` ${Math.max(...days[i].wind).toFixed(2)} kph`);

    $("#weather-cards")
      .children()
      .eq(i)
      .children()
      .eq(0)
      .children()
      .eq(4)
      .children()
      .text(`${Math.max(...days[i].humidity).toFixed(2)}%`);
  }
}
//event listener to caarry out function on search button
searchButton.on("click", function (event) {
  // This line allows us to take advantage of the HTML "submit" property
  // This way we can hit enter on the keyboard and it registers the search
  // (in addition to clicks). Prevents the page from reloading on form submit.
  event.preventDefault();

  // Empty the region associated with the articles
  // clear();

  // Build the query URL for the ajax request to the `Geocoder API
  var coordURL = getCoord();

  // Make the AJAX request to the API - GETs the JSON data at the coordURL.
  //note Asyns true by default code execution within function does not wait for response!!
  $.ajax({
    url: coordURL,
    method: "GET",
  }).then(function (response) {
    // console.log(response);
    //lat and lon from response set to lat lon variabales
    lat = response[0].lat;
    lon = response[0].lon;

    //five day URL function call return url set to fiveDay URL

    var fiveDayURL = get5Day();

    //data of search requested by the user saved to search var

    search = { city: $("#search-input").val().trim(), lat: lat, lon, lon };
    searchHistory.unshift(search);

    //this ensures only a max of 5 search histories aee saved to local storage

    if (searchHistory.length > 6) {
      searchHistory.splice(4, 1);
    }
    //previously rendered buttons removed to stop them aggregating each time the user searches
    $("#history").empty();
    //history rendered re-rendered here after a search as well as on page load
    renderHistory();

    // console.log(searchHistory);

    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
    // Make the AJAX request to the API - GETs the JSON data at the queryURL.
    // The data then gets passed as an argument to the updatePage function
    //Note: second Ajax call nested as it relies on getting the co-ordinates before
    //the 5 day weather can be queried
    $.ajax({
      url: fiveDayURL,
      method: "GET",
    }).then(function (response) {
      // console.log(response);

      sort(response);

      updateHTML(response);

      $("section").removeClass("hidden");

      //
      // console.log(getMode(day0.icon));
      // console.log(day0);
      // console.log(day1);
      // console.log(day2);
      // console.log(day3);
      // console.log(day4);
      // console.log(day5);

      clearData();
    });
  });
});
