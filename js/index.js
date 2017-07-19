$("document").ready(function () {
$("#location").hide();
  $("#description").hide();
  $("#temp").hide();
  $(".flex-container").hide();
  $("#toggle-temp").hide();
  $("#weather-info").hide();
  
  $("#temp").on("mouseover",function()
                       {
    var t = $("#temp").text().split(" ");
    if (t[1] == "F")
    {
      var s = (t[0]-32)/1.8;
      $("#temp").text(s.toFixed(1)+" ℃");
    }
    else if (t[1] == "℃")
    {
      var s = t[0]*1.8+32;
      $("#temp").text(s.toFixed(1)+" F");

    }
  });
  var latitude,longitude,location,apiId = "30b97d37e373530bbd0e1479d2b6c3b2",temp,pressure,humidity, src, icon, description, wind_speed, sunrise, sunset;
  
  $.getJSON('https://ipinfo.io', function(data){
    if (data == null)
    {
      $("#msg").text("Error");
    }
    else
    {
      var locationArray = data.loc.split(",");
      latitude = locationArray[0];
      longitude = locationArray[1];

      location = data.city+", "+data.country;

      var apiUrl = "https://cors.5apps.com/?uri=http://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&appid=" + apiId;

      $.getJSON(apiUrl, function(weatherData){
        console.log (weatherData);
        temp = weatherData.main.temp - 273.15;
        pressure =  weatherData.main.pressure;
        humidity =  weatherData.main.humidity;
        icon = weatherData.weather[0].icon;
        description = weatherData.weather[0].description;
        wind_speed = weatherData.wind.speed;
        sunrise = weatherData.sys.sunrise;
        sunset = weatherData.sys.sunset;
        switch (icon)
            {
          case '01d':src = "https://res.cloudinary.com/fvales/sunny_hl1mlu";break;
          case '01n': src = "https://res.cloudinary.com/fvales/night_v0jpcj";break;
          case '02d':src="https://res.cloudinary.com/fvales/partly-sunny_gjcval";break;
          case '02n':src="https://res.cloudinary.com/fvales/partly_cloudy_night_b2h2co";break;
          case '03d': 
          case '03n':src="https://res.cloudinary.com/fvales/cloud_wc9ruw";break;
          case '04d':
          case '04n':src="https://res.cloudinary.com/fvales/broken_cloud_dizzik";break;
          case '09d':
          case '09n':src="https://res.cloudinary.com/fvales/heavy_rain_zcxkps";break;
          case '10d': src="https://res.cloudinary.com/fvales/light_rain_day_clzbwx";break;
          case '10n': src="https://res.cloudinary.com/fvales/heavy_rain_night_pafyhs";break;
          case '11d': 
          case '11n':src="https://res.cloudinary.com/fvales/thunder_yd4qzz";break;
          case '13d': 
          case '13n':src="https://res.cloudinary.com/fvales/snow_kmthr3";break;
          case '50d': 
          case '50n':src = "https://res.cloudinary.com/fvales/mist_nwh9f";break;
        }


        var riseDate = new Date(sunrise * 1000);
        var sunriseTimeStr = riseDate.toLocaleTimeString();

        var setDate = new Date(sunset * 1000);
        var sunsetTimeStr = setDate.toLocaleTimeString();

        $("#weather-img").attr("src",src);
        $("#description").text(description);
        $("#location").text(location);
        $("#temp").text(temp.toFixed(1)+" ℃");
        $("#pressure").text(pressure+" hPa");
        $("#humidity").text(humidity+"%");
        $("#wind_speed").text(wind_speed+" m/s");
        $("#sunrise").text(sunriseTimeStr);
        $("#sunset").text(sunsetTimeStr);
        $("#weather-img").show();
        $("#location").show();
  $("#description").show();
  $("#temp").show();
  $(".flex-container").show();
  $("#toggle-temp").show();
  $("#weather-info").show();
      });
    }
  });

});