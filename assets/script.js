var apiKey = "826f633421f0289a9fa069f465862d53"
var cityName = document.querySelector("#location").value;
//var response = response.weatherReturned
let queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey;
var date = document.querySelector("#date");
var temp = document.querySelector("#temp");
var wind = document.querySelector("#wind");
var hum = document.querySelector("#hum");
console.log(hum);
console.log(wind);
console.log(temp);
console.log(date);
//fetch(`${API_BASE_URL}weather?q=${cityName}&appid=${apiKey}`);
//console.log(fetch);
var submitBtn = document.querySelector("#submit");
var locationInput = document.querySelector("#location");
var current = document.getElementById("#current");
console.log(current);
console.log(locationInput);
console.log(submitBtn);

function displayDate() {
  var currentDate = new Date();
  var dateString = currentDate.toLocaleDateString();
  $('#date').text(dateString);
  setTimeout(displayDate, 1000); 
}

$(document).ready(function() {
  displayDate();
});

// Add event listener to the submit button
submitBtn.addEventListener("click", () => {
  
    // Get the value of the location input
    var location = locationInput.value;
    
    // Build the query URL with the location input value and API key
    var apiKey = "826f633421f0289a9fa069f465862d53";
    var queryURL = `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=imperial`;
    
   // Call the fetch function with the query URL
fetch(queryURL)
  .then(response => response.json())
  .then(data => {
    temp = data.main.temp;
    hum = data.main.humidity;
    wind= data.wind.speed;
    icon= data.weather[0].icon;
    city = data.name;

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
    var currWeather = document.querySelector("#current");
    currWeather.appendChild(weatherData);
  })
  .catch(error => {
    console.error(error);
  });

  });