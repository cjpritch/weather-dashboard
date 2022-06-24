// Current Searched City 
var searchInput = document.getElementById("search-input");
var savedSearchesEl = document.getElementById("prev-search");
var searchBtn = document.getElementById("search-btn");
var displayCityName = document.getElementById("city-name");
var currentDate = moment().format("MM-YYYY");
var currentIcon = document.getElementById("current-icon");
var currentTemp = document.getElementById("current-temp");
var currentHumidity = document.getElementById("current-humidity");
var currentWind = document.getElementById("current-wind");
var badgeColor = document.getElementById("badge-color")
var currentUvIndex = document.getElementById("current-uv");
// 5-Day Forecast



var cities = [];

// Get current weather and save searched city into ul
function currentWeather (event) {
    event.preventDefault();

    var searchedCity =searchInput.value.trim();
    var savedCity = document.createElement("button");
    savedCity.className = "list-group-item";
    savedCity.innerHTML = searchInput.value;
    savedSearchesEl.appendChild(savedCity);
    localStorage.setItem("searchedCity", cities);

 var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&units=imperial&appid=3e1237532d278330dc9bb324c90a7c64`
 fetch(apiUrl)
    .then(function (response) {
        if (response.ok) {
            response.json().then (function(data) {
                //displayCityName.innerHTML = data.name + currentDate;
                var currentIconCode = data.weather[0].icon
                var currentIconUrl = `http://openweathermap.org/img/w/${currentIcon}.png`
                currentIconCode.src = currentIconUrl
                currentTemp.innerHTML = "Temp: " + data.main.temp + " \u00B0F";
                currentWind.innerHTML = "Wind: " + data.wind.speed + " mph";
                currentHumidity.innerHTML = "Humidity: " + data.main.humidity + " %";
                currentLat = data.coord.lat
                currentLon = data.coord.lon
                  var uVIndexUrl = `http://api.openweathermap.org/data/2.5/uvi?lat=${currentLat}&lon=${currentLon}&appid=3e1237532d278330dc9bb324c90a7c64`
                  fetch(uVIndexUrl)
                  .then(function (response) {
                      if (response.ok) {
                          console.log(response);
                          response.json().then(function (data){
                              console.log(data);
                              currentUvIndex.innerHTML = "UV Index: " +  data.value;
                              if (data.value >= 5.1) {
                                  badgeColor.className = "badge badge-danger"
                              } else if (data.value <= 2) {
                                  badgeColor.className = "badge badge-success"
                              } else if (data.value >= 2.1 && data.value <= 5) {
                                  badgeColor.className = "badge badge-warning"
                              }
                          })
                      }
                  })
              
            })
        }
    })  
    var fiveDayUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${searchedCity}&units=imperial&appid=3e1237532d278330dc9bb324c90a7c64` 
}








searchBtn.addEventListener("click", currentWeather);
