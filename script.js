$(document).ready(function() {

  var lat;
  var lon;
  
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      lat = position.coords.latitude;
      lon = position.coords.longitude;
      console.log(lat, lon);

      var call = "https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=b8f4759ff5ad0b84e904462161d6bb60";
      console.log(call);
      $.get(call + "&units=metric", "jsonp")
        .done(function(json) {
          var weatherData = {};
          weatherData = json;
          var tempC = weatherData.main.temp.toFixed(1);
          console.log(tempC);
          var weather = weatherData.weather[0].main;
          var humidity = weatherData.main.humidity;
          var pressure = weatherData.main.pressure;
          var windKph = weatherData.wind.speed;
          var location = weatherData.name + ", " + weatherData.sys.country;
          var iconid = weatherData.weather[0].id;
          console.log(iconid);
          var winddeg = weatherData.wind.deg;
          console.log(winddeg);
          $(".btn").html(tempC + "° C");
          $("#weather").html("Weather: " + weather);
          $("#humidity").html("Humidity: " + humidity + "%");
          $("#pressure").html("Pressure: " + pressure + " hPa");
          $(".wind").html("Speed: " + windKph + " m/s");
          $("#loc").html(location);
          $("#icon").html("<i class=" + "\"wi wi-owm-" + iconid + "\"></i>");
          console.log("<i class=" + "\"wi wi-owm-" + iconid + "\"></i>");
          $("#windicon").html("<i class=" + "\"wi wi-wind.towards-" + winddeg + "-deg\"></i>");
          console.log("<i class=" + "\"wi wi-wind.towards-" + winddeg + "-deg\"></i>");
          var tempF = (tempC * 9 / 5 + 32).toFixed(1);
          var windmph = (windKph * 0.621371192).toFixed(1);
          console.log(tempF);
          console.log(windmph);
          $(".btn").on("click", function() {
            if ($(".btn").is(":contains('° C')")) {
              $(".btn").html(tempF + "° F");
              $(".wind").html("Speed: " + windmph + " mph");
              $(".btn").console.log;
            }
            if ($(".btn").is(":contains('° F')")) {
              $(".btn").html(tempC + "° C");
              $(".wind").html("Speed: " + windKph + " kph");
            }
          });
        })
        .error(function(error) {
          console.log(error)
        });
    })
  }
});