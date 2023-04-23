var apiKey = "826f633421f0289a9fa069f465862d53"
var cityName = document.querySelector("#location").value;
//var response = response.weatherReturned
let queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey;

//fetch(`${API_BASE_URL}weather?q=${cityName}&appid=${apiKey}`);
//console.log(fetch);
var submitBtn = document.querySelector("#submit");
var locationInput = document.querySelector("#location");

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
        console.log(wind);
        console.log(hum);
        console.log(temp);
        console.log(icon);
        console.log(city);
      })
      .catch(error => {
        console.error(error);
      });
  });