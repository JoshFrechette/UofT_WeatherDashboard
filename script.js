var today = moment().format('DD/MM/YYYY');//Fetch the date from moment.js in the proper form
var cities =[];//An empty array to hold the city search history
let weatherKey = "&units=imperial&APPID=4df9a8b74a9e64205192fa481c567a1b";
var forecastIndex = 0;
var lat 
var long 


//============================= API Searches =============================================
//======== The function that will changes the weather info with each city chosen =========
function displayWeatherInfo(city) {//Display all weather info
    $("#current").empty();
    // $("#search-history").empty();//Prevents double buttons
    var city = $("#city-input").val().trim();
    console.log(city)

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + weatherKey;//Get the current weather 
    console.log(queryURL + " is the OpenWeather City response for today's weather")

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response, lat, long) { //change the function name to diif. it from the other functions (UV Index, forecast, etc..)?
            var lat = response.coord.lat;
            var long = response.coord.lon;
            console.log(city + long + " and " +  lat)
            var cityTemp = Math.round(response.main.temp);
            var cityTempIcon = response.weather[0].icon;
            var cityTempIconURL = "http://openweathermap.org/img/w/" + cityTempIcon + ".png";
            var cityHumidity = response.main.humidity;
            var cityWindSpeed = response.wind.speed;
            $("#current").empty();//
            $("#current")
                .append($("<h2>").html(city + " (" + today + ")" + "<img src=" + cityTempIconURL + ">")) //add the city name, weather icon and date to the curent weather display
                    .append($("<p>").html("Temperature: " + cityTemp + " °F")) //add the temperature
                        .append($("<p>").html("Humidity: " + cityHumidity + "%"))//add the humidity
                            .append($("<p>").html("Windspeed: " + cityWindSpeed + " MPH"))//add the windspeed
            return lat, long
        });
        
//==================== API call for Longitude and latitude for UV Index Info =====================

        var CityLat = lat;
        var CityLong = long;
        console.log(city + CityLong + " and " +  CityLat)

        var queryURL = "https://api.openweathermap.org/data/2.5/uvi?appid=" + weatherKey + "&lat=" + CityLat + "&lon=" + CityLong;
        console.log(queryURL + " is the OpenWeather City response for the uv index")
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            $("#current")
                .append($("<p>").text("<p>UV Index:<span id = current-UV>" + response.value + "</span></p>"))

 
        });

//========================================== 5 Day Forecast ======================================
        
        var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + weatherKey;
        console.log(queryURL + " is the OpenWeather City response for 5 day forecast")

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            console.log(response)
            $(".five-day").empty();//
            $(".forecast-head")
                .append($("<h2>").text("5-Day Forecast:"))
             for (i = 0; i <= 4; i++){
                console.log(i)

                //timestamp conversion
                // var timestamp = response.list[i].dt;
                // function timeCon() {
                //         var d = new Date(timestamp * 1000);
                //         timeStampCon = d.getDate() + '/' + (d.getMonth()) + '/' + d.getFullYear();
                //         console.log(timeStampCon)
                //         return timeStampCon;
                //     };
                //     console.log(timeCon)
                //     console.log(timeStampCon)
                //var cityDayForecast = response.list[i].dt_txt;

                var nextDay = moment().add(1 + i, 'days').format('DD/MM/YYYY');
                var cityIconForecast = response.list[i].weather[0].icon;
                var cityIconURLForecast = "http://openweathermap.org/img/w/" + cityIconForecast + ".png";
                var cityTempForecast = Math.round(response.list[i].main.temp);
                var cityHumidityForecast = response.list[i].main.humidity;
            $(".five-day")
            .append($("<div>").addClass("col-2 days")
            //$(".col-2 days")
                .append($("<p>").html(nextDay))//Add the day for the forecast
                    .append($("<img src=" + cityIconURLForecast + ">")) //add the weather icon
                        .append($("<p>").html("Temp: " + cityTempForecast + " °F"))//add the temperature
                            .append($("<p>").html("Humidity: " + cityHumidityForecast + "%")))//add the humidity
                            console.log(nextDay + ", " + cityHumidityForecast + ", " + cityTempForecast)
            }
        });

}


//Make the city search history buttons
function renderButtons(){
    //Empty previous search
    $("#search-history").empty();//Added back in

    for (i = 0; i < cities.length; i++) {
        $("#search-history").append($("<button>").addClass("past-city").attr("city-name", cities[i]).text(cities[i]).on("click", function(){//attr added back in          
        displayWeatherInfo(cities[i]);           
        }));     
    }
}

$("#add-city").on("click", function(event){
    
    event.preventDefault();
    // $("#search-history").empty();//Prevents double buttons
    var city = $("#city-input").val().trim();
    console.log(city)
    cities.push(city);
    console.log(cities + " updated cities array")
    displayWeatherInfo(city);
    renderButtons();
    return city
});
    $(".past-city").on("click", displayWeatherInfo);
    console.log(cities)
    renderButtons();

function newFunction() {
    console.log("new function");
    displayWeatherInfo();
}

