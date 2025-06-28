const apiKey = "b2207028126ebf27cd4dbe635418900e";

// This event listener listens for "Enter" keypress in the input box
document.getElementById("cityInput").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    getCoordinates();  // Call the function to fetch coordinates for the city
  }
});


//This function gets the latitude and longitude of the city you typed
async function getCoordinates() {
  const city = document.getElementById("cityInput").value.trim(); // Removes spaces

  if (!city) return; //If no city entered, stop

  //API URL to get latitude and longitude of the city
  const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;
  
  const geoResponse = await fetch(geoUrl); //Calls the API
  const geoData = await geoResponse.json(); //Converts the response into JSON data

  // If API returns nothing, display "City not found"
  if (geoData.length === 0) {
    document.getElementById("output").innerHTML = "<p>City not found.</p>";
    return;
  }
  const { lat, lon, name, country, state } = geoData[0];//Extract latitude, longitude, and location info from API result
  getWeather(lat, lon, name, country, state);  //call getWeather() function using these coordinates
}


//This function gets and displays weather details based on lat/lon
async function getWeather(lat, lon, name, country, state) {
  //API URL to fetch weather data
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  const weatherResponse = await fetch(weatherUrl); //Fetch data from weather API
  const weatherData = await weatherResponse.json(); //Convert it to JSON

  
  const { main, weather, wind, sys } = weatherData;//Extract needed info from the JSON

  //Set background color & emoji icon based on temperature
  let bgColor = "#1e3c72";  // default background
  let emojiIcon = "❓";      // default emoji

  if (main.temp <= 5) {
    bgColor = "#0077b6";  // Cold blue
    emojiIcon = "❄️";     // Snow emoji
  } else if (main.temp <= 15) {
    bgColor = "#00b4d8";  // Cool blue
    emojiIcon = "🌥️";     // Cloud emoji
  } else if (main.temp <= 25) {
    bgColor = "#90be6d";  // Pleasant green
    emojiIcon = "🌤️";     // Partly sunny emoji
  } else if (main.temp <= 35) {
    bgColor = "#f9844a";  // Warm orange
    emojiIcon = "☀️";     // Sunny emoji
  } else {
    bgColor = "#f94144";  // Hot red
    emojiIcon = "🔥";     // Fire emoji
  }
  document.body.style.background = bgColor; //Change background color of the whole page (but not the card)

  const output = `
    <h2>${name}, ${country}</h2>
    <div style="font-size: 4rem;">${emojiIcon}</div> <!-- Weather icon -->
    <p><strong>Temperature:</strong> ${main.temp} °C</p>
    <p><strong>Feels Like:</strong> ${main.feels_like} °C</p>
    <p><strong>Weather:</strong> ${weather[0].description}</p>
    <p><strong>Wind Speed:</strong> ${wind.speed} km/h</p>
    <p><strong>Humidity:</strong> ${main.humidity}%</p>
    <p><strong>Min/Max:</strong> ${main.temp_min}°C / ${main.temp_max}°C</p>
    <p><strong>Pressure:</strong> ${main.pressure} hPa</p>
    <p><strong>Sunrise:</strong> ${new Date(sys.sunrise * 1000).toLocaleTimeString()}</p>
    ${state ? `<p><strong>State:</strong> ${state}</p>` : ""}  <!-- Show state if available -->
  `;
  document.getElementById("output").innerHTML = output; //output section of the page
}
