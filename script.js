/*const apiKey = "b2207028126ebf27cd4dbe635418900e";
async function getCoordinates() {
  const city = document.getElementById("cityInput").value;

  const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;
  
  const geoResponse = await fetch(geoUrl);
  const geoData = await geoResponse.json();

  if (geoData.length === 0) {
    document.getElementById("output").innerHTML = "City not found.";
    return;
  }

  const { lat, lon, name, country } = geoData[0];
  getWeather(lat, lon, name, country);
}

async function getWeather(lat, lon, name, country) {
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  
  const weatherResponse = await fetch(weatherUrl);
  const weatherData = await weatherResponse.json();

  const { main, weather, wind } = weatherData;

  const output = `
    <h2>Weather in ${name},${country} </h2>
    <p><strong>Temperature:</strong> ${main.temp} °C</p>
    <p><strong>Feels Like:</strong> ${main.feels_like} °C</p>
    <p><strong>Weather:</strong> ${weather[0].description}</p>
    <p><strong>Wind Speed:</strong> ${wind.speed} km/h</p>
    <p><strong>State:</strong> ${state}<p>
  `;

  document.getElementById("output").innerHTML = output;
}
*/

const apiKey = "b2207028126ebf27cd4dbe635418900e";

async function getCoordinates() {
  const city = document.getElementById("cityInput").value;

  const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;
  const geoResponse = await fetch(geoUrl);
  const geoData = await geoResponse.json();

  if (geoData.length === 0) {
    document.getElementById("output").innerHTML = "<p>City not found.</p>";
    return;
  }

  const { lat, lon, name, country, state } = geoData[0];
  getWeather(lat, lon, name, country, state);
}

async function getWeather(lat, lon, name, country, state) {
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  const weatherResponse = await fetch(weatherUrl);
  const weatherData = await weatherResponse.json();

  const { main, weather, wind } = weatherData;
  const icon = weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

  const output = `
    <h2>${name}, ${country}</h2>
    <img src="${iconUrl}" alt="Weather icon" class="weather-icon">
    <p><strong>Temperature:</strong> ${main.temp} °C</p>
    <p><strong>Feels Like:</strong> ${main.feels_like} °C</p>
    <p><strong>Weather:</strong> ${weather[0].description}</p>
    <p><strong>Wind Speed:</strong> ${wind.speed} km/h</p>
    ${state ? `<p><strong>State:</strong> ${state}</p>` : ""}
  `;

  document.getElementById("output").innerHTML = output;
}
