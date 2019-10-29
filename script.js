var today = moment().subtract(10, 'days').calendar(); 
console.log(today + " is the day that the user is seeing for the current forecast")

var cities =[];

function displayWeatherInfo() {

  var city = $(this).attr("city-name");
  
  //var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=4df9a8b74a9e64205192fa481c567a1b";
  var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "=4df9a8b74a9e64205192fa481c567a1b";
    console.log(queryURL + " is the OpenWeather City response")
    console.log(city)

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        var cityName = $("#current").text(response.city + today);
        console.log(cityName + " is the name that appears in the current weather field")

        $("#current").empty();
        $("#current").append(cityName);

    });
    console.log(city)
}

function renderButtons(){

    $("#search-history").empty();

    for (var i = 0; i < cities.length; i++) {

        $("#search-history").append($("<button>" + cities[i] + "</button>").addClass("past-city"));

       /*var a = $("<button>");

        a.addClass("past-city");

        a.attr("city-name", cities[i]);

        a.text(cities[i]);
*/
        
    }
}

$("#add-city").on("click", function(event) {
    event.preventDefault();

    var city = $("#city-input").val().trim();
    console.log(city)
    

    cities.push(city);
    console.log(cities + " updated cities array")

    renderButtons();
});

$(document).on("click", ".past-city", displayWeatherInfo);
console.log(cities)

renderButtons();
