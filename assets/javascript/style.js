const apiKey = "08fe5dd7c40587be64a6aa22b9cfc117";
const getCityName = () => document.querySelector("#cityInput");
const setCityName = () => document.querySelector(".city-name");

function get(requestUrl) {
  return fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .catch((e) => {
      console.log(e);
    });
}

var getCityWeather = async () => {
  const cityName = getCityName();

  const url = `https://api.openweathermap.org/data/2.5/weather?=&q=${cityName.value}&appid=${apiKey}`;

  const response = await get(url);
  debugger;
  const displayName = setCityName();
  displayName.innerHTML = response.name;
  debugger;
  //   const displayTemp = response.main.temp
};
