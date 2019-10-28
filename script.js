var today = moment().subtract(10, 'days').calendar(); 
console.log(today + " is the day that the user is seeing for the current forecast")

var cities =[];
var time = 0;

function displayWeatherInfo() {

  var city = $(this).attr("city-name");
  var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=4df9a8b74a9e64205192fa481c567a1b";
    


    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {

    });
}

