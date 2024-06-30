var cityInput = document.getElementById("searchCity");

var backgroundsList = [
  "clear.png",
  "cloudy.png",
  "sunny.jpg",
  "rainy.jpg",
  "thunderstorm.jpg"
];

var randomBackground = backgroundsList[Math.floor(Math.random() * backgroundsList.length)];

document.body.style.background = "linear-gradient(rgba(0, 0, 0, 0.5),rgba(0, 0, 0, 0.5)) , url('bg/" + randomBackground + "')";

cityInput.addEventListener("keyup", function(event)
{
  if(event.key === "Enter")
  {
		loader();
		function loader()
		{

			document.getElementById("locationName").innerHTML = "";
			document.getElementById("temperatureValue").innerHTML = "";
			document.getElementById("weatherType").innerHTML = "";

			const img1 = document.createElement("img");
			const img2 = document.createElement("img");
			const img3 = document.createElement("img");

			img1.id = "loader1";
			img2.id = "loader2";
			img3.id = "loader3";

			img1.src = "icons/loader.gif";
			img2.src = "icons/loader.gif";
			img3.src = "icons/loader.gif";

			const parentElement1 = document.getElementById("locationName");
			const parentElement2 = document.getElementById("temperatureValue");
			const parentElement3 = document.getElementById("weatherType");

			parentElement1.appendChild(img1);
			parentElement2.appendChild(img2);
			parentElement3.appendChild(img3);
		}

    var cityInputValue = cityInput.value;

    var apiKey = "51a28f3b763e75d5bfce7469f49e014c"; 
    var unit = "metric";
    var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInputValue}&appid=${apiKey}&units=${unit}`;

    if(cityInputValue != "")
    {
      async function getWeather()
      {
        var response = await fetch(apiUrl);
        var data = await response.json();

        if(data.message != "city not found" && data.cod != "404")
        {
          var location = data.name;
          var temperature = data.main.temp;
          var weatherType = data.weather[0].description;
          var realFeel = data.main.feels_like;
          var windSpeed = data.wind.speed;
          var windDirection = data.wind.deg;
          var visibility = data.visibility / 1000;
          var pressure = data.main.pressure;
          var maxTemperature = data.main.temp_max;
          var minTemperature = data.main.temp_min;
          var humidity = data.main.humidity;
          var sunrise = data.sys.sunrise;
          var sunset = data.sys.sunset;
        
          document.getElementById("locationName").innerHTML = location;
          document.getElementById("temperatureValue").innerHTML = temperature + "<sup>o</sup>C";
          document.getElementById("weatherType").innerHTML = weatherType.charAt(0).toUpperCase() + weatherType.slice(1);
          document.getElementById("realFeelAdditionalValue").innerHTML = realFeel + "<sup>o</sup>C";
          document.getElementById("windSpeedAdditionalValue").innerHTML = windSpeed + " km/h";
          document.getElementById("windDirectionAdditionalValue").innerHTML = windDirection+"<sup>o</sup>";
          document.getElementById("visibilityAdditionalValue").innerHTML = visibility + " km";
          document.getElementById("pressureAdditionalValue").innerHTML = pressure+" hPa";
          document.getElementById("maxTemperatureAdditionalValue").innerHTML = maxTemperature + "<sup>o</sup>C";
          document.getElementById("minTemperatureAdditionalValue").innerHTML = minTemperature + "<sup>o</sup>C";
          document.getElementById("humidityAdditionalValue").innerHTML = humidity+'%';
          document.getElementById("sunriseAdditionalValue").innerHTML = sunrise;
          document.getElementById("sunsetAdditionalValue").innerHTML = sunset;
        }
        else
				{
					document.getElementById("locationName").innerHTML = "City Not Found";
					document.getElementById("temperatureValue").innerHTML = "";
					document.getElementById("weatherType").innerHTML = "";
				}
      }

      getWeather();
    }
    else document.getElementById("locationName").innerHTML = "Enter a city name...";
  }
});