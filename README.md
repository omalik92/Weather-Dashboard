# Weather-App

## Description

This project is a repsonsive weather app designed to be viewed within your browser on your mobile phone or PC. The required data for this application was provided by the Open-Weather API and requested using AJAX coupled with the .then method (see below snippet). AJAX = asynchrhonous Javacript and XML and allows your script to continue page rendering whilst elements that require the requested data await a response.

```javascript
$.ajax({
url: coordURL,
method: "GET",
}).then(function (response) {
// console.log(response);
//lat and lon from response set to lat lon variabales
lat = response[0].lat;
lon = response[0].lon;
```

[Link to deployed application.](https://omalik92.github.io/Weather-Dashboard/)

## Installation

To install and modify this application use the following steps:

1. Download the repository
2. Open the folder in an IDE such as VS code.
3. Navigate to the index.html file.
4. Open in your browser.

## Usage

To use the app simply type the city name of your choosing into the text input field. The 5 day weather forecast will automatically load to the page as well as buttons for your previous searches, allowing you to easily toggle between previous searches. On reloading of the page your browsers local sotage should ensure that the last requested weather forecast is presented to you alongsisde up to the last 5 searches (presented on grey buttons)

![web page screen shot](./assets/Pictures/Weather%20App%20Demo.gif)

## Credits

https://www.w3schools.com/jquery/jquery_ajax_intro.asp#:~:text=What%20is%20AJAX%3F,%2C%20Youtube%2C%20and%20Facebook%20tabs.

## License

Please refer to the licence in the repo.
