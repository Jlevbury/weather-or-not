var apiKey = "826f633421f0289a9fa069f465862d53"
var cityName = document.querySelector("#location").value;
//var response = response.weatherReturned
let queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey;

//fetch(`${API_BASE_URL}weather?q=${cityName}&appid=${apiKey}`);
//console.log(fetch);
const submitBtn = document.querySelector("#submit");
const locationInput = document.querySelector("#location");

// Add event listener to the submit button
submitBtn.addEventListener("click", () => {
    // Get the value of the location input
    const location = locationInput.value;
    
    // Build the query URL with the location input value and API key
    const apiKey = "826f633421f0289a9fa069f465862d53";
    const queryURL = `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;
    
    // Call the fetch function with the query URL
    fetch(queryURL)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        // Append the data to the page for the user to view
      })
      .catch(error => {
        console.error(error);
      });
  });