function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let currentDay = days[now.getDay()];

  let currentHour = now.getHours();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }

  let currentMinute = now.getMinutes();
  if (currentMinute < 10) {
    currentMinute = `0${currentMinute}`;
  }

  return `${currentDay} ${currentHour}:${currentMinute}`;
}
let now = new Date();

let date = document.querySelector("#day-hour");
date.innerHTML = formatDate(now);

function showWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureDisplay = document.querySelector("#current-temperature");
  temperatureDisplay.innerHTML = temperature;
  let cityName = response.data.name;
  let h1 = document.querySelector("h1");
  h1.innerHTML = cityName;
  let weatherDescription = response.data.weather[0].description;
  let description = document.querySelector("#weather-description");
  description.innerHTML = weatherDescription;
}

function cityName(event) {
  event.preventDefault();
  let city = document.querySelector("h1");
  let userInput = document.querySelector("#city-name");
  city.innerHTML = userInput.value;
  let apiKey = "4b77c6f51c0468737462b78552f4f9a8";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${userInput.value}&units=${units}&appid=${apiKey}`;

  axios.get(apiUrl).then(showWeather);
}

let inputForm = document.querySelector("#input-Form");
inputForm.addEventListener("submit", cityName);

function handlePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "b673a6fd2063be7438876eb814c9f14f";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&&units=${units}`;
  axios.get(url).then(showWeather);
}
function getCurrentInfo(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(handlePosition);
}
let currentInfo = document.querySelector("#current-button");
currentInfo.addEventListener("click", getCurrentInfo);
