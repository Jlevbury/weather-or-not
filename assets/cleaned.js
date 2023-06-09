var apiKey = "826f633421f0289a9fa069f465862d53";
var cityName = document.querySelector("#location").value;
let queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey;
let fiveDayURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + apiKey;

var date = document.querySelector("#date");
var temp = document.querySelector("#temp");
var wind = document.querySelector("#wind");
var hum = document.querySelector("#hum");

var submitBtn = document.querySelector("#submit");
var ddFiveDay = document.querySelector("#ddFiveDay");
var locationInput = document.querySelector("#location");
var current = document.getElementById("current");

function displayDate() {
  var currentDate = new Date();
  var dateString = currentDate.toLocaleDateString();
  $('#date').text(dateString);
  setTimeout(displayDate, 1000); 
}

$(document).ready(function() {
  displayDate();
  displayStoredCities();
});

function getCurrentForecast(city) {
  var apiKey = "826f633421f0289a9fa069f465862d53";
  var queryURL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

  fetch(queryURL)
    .then(response => response.json())
    .then(data => {
        temp = data.main.temp;
        console.log(temp);
        hum = data.main.humidity;
        wind= data.wind.speed;
        icon= data.weather[0].icon;
        city = data.name;
        date = data.dt;
        console.log(date);
    
        // create parent element
        var weatherData = document.createElement("div");
        weatherData.setAttribute("id", "weather-data");
    
        // create child elements
        var tempEl = document.createElement("p");
        tempEl.innerHTML = "Temperature: " + temp;
    
        var humEl = document.createElement("p");
        humEl.innerHTML = "Humidity: " + hum;
    
        var windEl = document.createElement("p");
        windEl.innerHTML = "Wind Speed: " + wind;
    
        var iconEl = document.createElement("img");
        iconEl.src = "http://openweathermap.org/img/w/" + icon + ".png";
    
        var cityEl = document.createElement("p");
        cityEl.innerHTML = "City: " + city;
    
        // append child elements to parent element
        weatherData.appendChild(tempEl);
        weatherData.appendChild(humEl);
        weatherData.appendChild(windEl);
        weatherData.appendChild(iconEl);
        weatherData.appendChild(cityEl);
    
        // append parent element to currWeather
        var currWeather = document.querySelector("#now");
        currWeather.appendChild(weatherData);
          // remove any existing forecast data
          var existingCurrentData = document.querySelector("#now");
          if (existingCurrentData) {
            existingCurrentData.remove();
          }
    })
    .catch(error => {
      console.error(error);
    });
}

function getFiveDayForecast(city) {
  var apiKey = "826f633421f0289a9fa069f465862d53";
  let fiveDayURL = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=40&appid=${apiKey}&units=imperial`;

  fetch(fiveDayURL)
    .then(response => response.json())
    .then(data => {
        console.log(data);
  
        // create parent element
        var forecastData = document.createElement("div");
        forecastData.setAttribute("id", "forecast-data");
  
        for (let i = 0; i < data.list.length; i += 8) {
          const day = data.list[i];
  
          const date = new Date(day.dt * 1000).toLocaleDateString();
          const temp = day.main.temp;
          const humidity = day.main.humidity;
          const windSpeed = day.wind.speed;
          const iconUrl = `http://openweathermap.org/img/w/${day.weather[0].icon}.png`;
  
          // create child elements
          var dayEl = document.createElement("div");
          dayEl.classList.add("day");
  
          var dateEl = document.createElement("p");
          dateEl.innerHTML = date;
  
          var iconEl = document.createElement("img");
          iconEl.src = iconUrl;
  
          var tempEl = document.createElement("p");
          tempEl.innerHTML = `Temperature: ${temp} &#8457;`;
  
          var humidityEl = document.createElement("p");
          humidityEl.innerHTML = `Humidity: ${humidity}%`;
  
          var windSpeedEl = document.createElement("p");
          windSpeedEl.innerHTML = `Wind Speed: ${windSpeed} mph`;
  
          // append child elements to day element
          dayEl.appendChild(dateEl);
          dayEl.appendChild(iconEl);
          dayEl.appendChild(tempEl);
          dayEl.appendChild(humidityEl);
          dayEl.appendChild(windSpeedEl);
  
          // append day element to parent element
          forecastData.appendChild(dayEl);
        }
  
        // remove any existing forecast data
        var existingForecastData = document.querySelector("#forecast-data");
        if (existingForecastData) {
          existingForecastData.remove();
        }
  
        // append parent element to forecast section
        var forecastSection = document.querySelector("#forecast");
        forecastSection.appendChild(forecastData);
    })
    .catch(error => {
      console.error(error);
    });
}

// Add event listener to the submit button
submitBtn.addEventListener("click", () => {
  var location = locationInput.value;

  // Save the city name to local storage
  var storedCities = JSON.parse(localStorage.getItem("cities")) || [];
  if (!storedCities.includes(location)) {
    storedCities.push(location);
    localStorage.setItem("cities", JSON.stringify(storedCities));
    displayStoredCities();
  }

  // Call the APIs to get the current and future forecast for the entered city
  getCurrentForecast(location);
  getFiveDayForecast(location);
});

function displayStoredCities() {
  var storedCities = JSON.parse(localStorage.getItem("cities")) || [];
  var citiesList = document.querySelector("#stored-cities");

  // Clear the list
  citiesList.innerHTML = "";

  // Populate the list with stored cities
  storedCities.forEach(city => {
    var cityEl = document.createElement("li");
    cityEl.textContent = city;

    // Add a click event listener to the city element
    cityEl.addEventListener("click", () => {
      // Call the APIs to get the current and future forecast for the clicked city
      getCurrentForecast(city);
      getFiveDayForecast(city);
    });

    citiesList.appendChild(cityEl);
  });
}
