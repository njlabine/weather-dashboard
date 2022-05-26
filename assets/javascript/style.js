const apiKey = "08fe5dd7c40587be64a6aa22b9cfc117";
const getCityName = () => document.querySelector("#cityInput");
const setCityName = () => document.querySelector(".city-name");
const setCityTemp = () => document.querySelector(".temp");
const setForcast = () => document.querySelector(".forecast");
const cityContainer = () => document.querySelector(".city-search-container");

const getSearchedCities = () => {
  const cityStorage = localStorage.getItem("cityStorage");
  debugger;
  const jsonCities = JSON.parse(cityStorage);
  debugger;
  return jsonCities;
};

const setSearchedCities = (city) => {
  const cityStorage = getSearchedCities();
  if (!cityStorage.includes(city)) {
    const newCities = [city].concat(cityStorage);
    localStorage.setItem("cityStorage", JSON.stringify(newCities));
  }
};

function get(requestUrl) {
  return fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .catch((e) => {
      console.log(e);
    });
}
const convertTemp = (valNum) => {
  valNum = parseFloat(valNum);
  valNum = (valNum - 273.15) * 1.8 + 32;
  return Math.round(valNum * 100) / 100;
};

const getFiveDayForecast = (data) => {
  const lat = data.coord.lat;
  const lon = data.coord.lon;

  const fiveDayUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

  const fiveDay = fetch(fiveDayUrl)
    .then((response) => {
      return response.json();
    })
    .catch((e) => {
      console.log(e);
    });

  return fiveDay;
};

const buildForecastCard = (forecastData) => {
  let forecastCard = `
  	<div class="forecast-card">
			<div class="forecast-temp-min">
				<span><label>Temp Min:</label> ${forecastData.temp.min}</span>
      </div>
      <div class="forecast-temp-max">
				<span><label>Temp Max:</label> ${forecastData.temp.max}</span>
      </div>
		</div>
  `;

  return forecastCard;
};
const buildForecast = (forecastData) => {
  let forecastContainer = setForcast();

  for (let i = 0; i <= 5; i++) {
    debugger;
    forecastContainer.innerHTML += buildForecastCard(forecastData[i]);
  }
};

var getCityWeather = async () => {
  const cityName = getCityName();
  setSearchedCities(cityName.value);

  const url = `https://api.openweathermap.org/data/2.5/weather?=&q=${cityName.value}&appid=${apiKey}`;

  const response = await get(url);

  const displayName = setCityName();
  displayName.innerHTML = response.name;

  const displayTemp = setCityTemp();
  displayTemp.innerHTML = `Temp ${convertTemp(response.main.temp)} &#8457;`;
  const fiveDay = await getFiveDayForecast(response);
  buildForecast(fiveDay.daily);
};

const renderCityCard = (city) => {
  city = city
    .toLowerCase()
    .split(" ")
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(" ");

  debugger;
  return `
  	<div class="city-card">
    	<label class="city-label">${city}</label>
    </div>
  `;
};

const init = () => {
  const cityWrapper = cityContainer();
  const cityStorage = getSearchedCities();
  debugger;
  cityStorage.map((city) => {
    cityWrapper.innerHTML += renderCityCard(city);
  });
};

init();
