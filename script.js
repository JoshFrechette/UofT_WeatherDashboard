//Fetch the date from moment.js in the proper form
var today = moment().format('DD/MM/YYYY');//not right
console.log(today + " is the day that the user is seeing for the current forecast")
//An empty array to hold the city search history
var cities =[];

//The function that will 
function displayWeatherInfo(city) {
  

  //Get the city name from the text input box
  //var city = $(this).text();// Changed from "city-name"
  //Get the current weather 
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=4df9a8b74a9e64205192fa481c567a1b";
    console.log(queryURL + " is the OpenWeather City response for today's weather")
  //var queryURL2 = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&APPID=4df9a8b74a9e64205192fa481c567a1b";
  //console.log(queryURL2 + " is the OpenWeather City response for 5 day forecast")
    console.log(city)

// Add code for 5 day forecast once current weather is working
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log("hi");
        console.log($("#current").text(response.name + " (" + today + ")"));
        
        console.log(city + " is the name that appears in the current weather field")

        $("#current").empty();// Clear previous search to avoid repeats

        $("#current-weather").append("<h2>").text(response.name + " (" + today + ")");
        $("#current-temp").append("<p>").text("Temperature: " + response.main.temp);
        console.log(response.main.temp + "is the temperature right now")
        $("#current-humid").append("<p>").text("Temperature: " + response.temp);
        $("#current-windspd").append("<p>").text("Temperature: " + response.temp);
        $("#current-UV").append("<p>").text("Temperature: " + response.temp);

        queryURL = "hi";
        /*$.ajax({
            url: queryURL2,
            method:"GET"
        }).then(function(response){
            console.log(response)
            $("#forecast").empty();// Clear previous search to avoid repeats
            $("#day2").text();


        });*/

    });
    console.log(city)
}
//Make the city search history buttons
function renderButtons(){
    //Empty previous search
    $("#search-history").empty();

    for (var i = 0; i < cities.length; i++) {

        $("#search-history").append($("<button>").text(cities[i]).addClass("past-city").on("click", function(){
            displayWeatherInfo(cities[i]);
        }));     
    }
}

$("#add-city").on("click", function(event){
    event.preventDefault();
    //newFunction();

    var city = $("#city-input").val().trim();
    console.log(city)
    

    cities.push(city);
    console.log(cities + " updated cities array")
    displayWeatherInfo(city);

    renderButtons();
});

// $(".past-city").on("click", displayWeatherInfo);
console.log(cities)

renderButtons();
function newFunction() {
    console.log("new function");
    displayWeatherInfo();
}

