$.getJSON("http://ip-api.com/json", function(jsonPos) {
  var lat = jsonPos.lat;
  var lon = jsonPos.lon;
  
  var call = "https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=b8f4759ff5ad0b84e904462161d6bb60";

  $.get(call + "&units=metric", "jsonp")
    .done(function(jsonData) {
      var weatherData = {};
      weatherData = jsonData;
      var tempC = weatherData.main.temp.toFixed(1);
      var weather = weatherData.weather[0].main;
      var humidity = weatherData.main.humidity;
      var pressure = weatherData.main.pressure;
      var windKph = weatherData.wind.speed;
      var location = jsonPos.city + ", " + weatherData.sys.country;
      var iconid = weatherData.weather[0].id;

      $(".btn").html(tempC + "° C");
      $("#weather").html("Weather: " + weather);
      $("#humidity").html("Humidity: " + humidity + "%");
      $("#pressure").html("Pressure: " + pressure + " hPa");
      $(".wind").html("Wind Speed: " + windKph + " m/s");
      $("#loc").html(location);
      $("#icon").html("<i class=" + "\"wi wi-owm-" + iconid + "\"></i>");

      var tempF = (tempC * 9 / 5 + 32).toFixed(1);
      var windmph = (windKph * 0.621371192).toFixed(1);

      $(".btn").on("click", function() {
        if ($(".btn").is(":contains('° C')")) {
          $(".btn").html(tempF + "° F");
          $(".wind").html("Wind Speed: " + windmph + " mph");
        }
        else if ($(".btn").is(":contains('° F')")) {
          $(".btn").html(tempC + "° C");
          $(".wind").html("Wind Speed: " + windKph + " kph");
        }
        else{
          $(".btn").html("Button is not working");
        }
      });
    })
    .fail(function(error) {
      throw error;
    });
})
