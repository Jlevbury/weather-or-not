var apiKey = "826f633421f0289a9fa069f465862d53"
var cityName = document.querySelector("#location").value;
//var response = response.weatherReturned
let queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey;
let fiveDayURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + apiKey;
console.log(fiveDayURL);
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
var ddFiveDay = document.querySelector("#ddFiveDay")
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
    var currWeather = document.querySelector("#current");
    currWeather.appendChild(weatherData);
  })
  .catch(error => {
    console.error(error);
  });

  });
 /* ddFiveDay.addEventListener("click", () => {
    var location = locationInput.value;
    var apiKey = "826f633421f0289a9fa069f465862d53";
    let fiveDayURL = `http://api.openweathermap.org/data/2.5/forecast?q=${location}&cnt=5&appid=${apiKey}&units=imperial`
  
    fetch(fiveDayURL)
    .then(response => response.json())
    .then(data => {
     console.log(data);
     main = data.city.name;
     console.log(main);
     temp = data.list[0].main.temp;
     //console.log(temp);
     wind= data.list[0].wind.speed;
     //console.log(wind);
     icon= data.list[0].weather[0].icon;
    // console.log(icon);
       date = data.list[0].dt_txt;// need to figure out how to only collect 5 days, instead of 40 different hour slots.
    // console.log(date);
      hum = data.list[0].main.humidity;
      console.log(hum)


   var dayOne =[main];
   console.log(dayOne);
     const myArray = ['main', 'temp', 'wind', 'hum','icon', 'date'];
     //console.log(myArray);
const myElement = document.querySelector('#five-day');

for (let i = 0; i < 5 && i < myArray.length; i++) {
  const item = myArray[i];
  const newItemElement = document.createElement('p');
  newItemElement.textContent = item;
  myElement.appendChild(newItemElement);
}
    })
    .catch(error => {
      console.error(error);
    });
  })*/
  ddFiveDay.addEventListener("click", () => {
    var location = locationInput.value;
    var apiKey = "826f633421f0289a9fa069f465862d53";
    let fiveDayURL = `http://api.openweathermap.org/data/2.5/forecast?q=${location}&cnt=40&appid=${apiKey}&units=imperial`
  
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
  });
  