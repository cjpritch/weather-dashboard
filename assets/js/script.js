// Current Searched City 
var searchInput = document.getElementById("search-input");
var savedSearchesEl = document.getElementById("prev-search");
var searchBtn = document.getElementById("search-btn");
var displayCityName = document.getElementById("city-name");
var currentDate = moment().format("MM/DD/YY");
var currentIcon = document.getElementById("current-icon");
var currentTemp = document.getElementById("current-temp");
var currentHumidity = document.getElementById("current-humidity");
var currentWind = document.getElementById("current-wind");
var badgeColor = document.getElementById("badge-color")
var currentUvIndex = document.getElementById("current-uv");
// 5-Day Forecast
var dayOneDateEl = document.getElementById("day-1-date");
var dayOneIcon = document.getElementById("day-1-icon");
var dayOneTempEl = document.getElementById("day-1-temp");
var dayOneWindEl = document.getElementById("day-1-wind");
var dayOneHumidEl = document.getElementById("day-1-humidity");
var dayTwoDateEl = document.getElementById("day-2-date");
var dayTwoIcon = document.getElementById("day-2-icon");
var dayTwoTempEl = document.getElementById("day-2-temp");
var dayTwoWindEl = document.getElementById("day-2-wind");
var dayTwoHumidEl = document.getElementById("day-2-humidity");
var dayThreeDateEl = document.getElementById("day-3-date");
var dayThreeIcon = document.getElementById("day-3-icon")
var dayThreeTempEl = document.getElementById("day-3-temp");
var dayThreeWindEl = document.getElementById("day-3-wind");
var dayThreeHumidEl = document.getElementById("day-3-humidity");
var dayFourDateEl = document.getElementById("day-4-date");
var dayFourIcon = document.getElementById("day-4-icon")
var dayFourTempEl = document.getElementById("day-4-temp");
var dayFourWindEl = document.getElementById("day-4-wind");
var dayFourHumidEl = document.getElementById("day-4-humidity");
var dayFiveDateEl = document.getElementById("day-5-date");
var dayFiveIcon = document.getElementById("day-5-icon")
var dayFiveTempEl = document.getElementById("day-5-temp");
var dayFiveWindEl = document.getElementById("day-5-wind");
var dayFiveHumidEl = document.getElementById("day-5-humidity");


var cities = [];



// Make previous searches a button to reload weather info
if (localStorage.getItem("searchedCity")) {
    cities = localStorage.getItem("searchedCity");
    var cityHistory = [];
    cityHistory = cities.split(",");
    cities = cityHistory

    for (var i = 0; i < cityHistory.length; i++) {
        var reloadCity = document.createElement("button");
        reloadCity.classList = "list-group-item";
        reloadCity.innerHTML = cityHistory[i];
        savedSearchesEl.append(reloadCity);
    }
}

// Add prev searched cities to array
function addArray () {
    var searchedCity = searchInput.value.trim()
    var addCityArray = cities 
    addCityArray.push(searchedCity)
    localStorage.setItem("searchedCity", addCityArray);
}

// Get current weather and save searched city into ul
function currentWeather (event) {
    event.preventDefault();

    var searchedCity = searchInput.value.trim();
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
                displayCityName.innerHTML = data.name + " " + "(" + currentDate + ")";
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
// 5 day forecast fetch 
    var fiveDayUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${searchedCity}&units=imperial&appid=3e1237532d278330dc9bb324c90a7c64`

    fetch(fiveDayUrl)
        .then(function(response) {
            if (response.ok) {
                response.json().then(function(data) {

                //Day 1 Card Display
                  var dayOneCode = data.list[3].dt
                  dayOneDate = moment(currentDate).add(1, 'd');
                  dayOneDateEl.innerHTML = dayOneDate.format("MM/DD/YY");
                  console.log(data.list[3].weather[0].icon)
                  var dayOneIconCode = data.list[3].weather[0].icon
                  var dayOneiconUrl = `http://openweathermap.org/img/w/${dayOneIconCode}.png`
                  dayOneIcon.src = dayOneiconUrl
                  dayOneTempEl.innerHTML = "Temp: " + data.list[3].main.temp + ' \u00B0F';
                  dayOneWindEl.innerHTML = "Wind: " + data.list[3].wind.speed + ' mph';
                  dayOneHumidEl.innerHTML = "Humidity: " + data.list[3].main.humidity + "%";

                  //Day 2 Card Display
                  var dayTwoCode = data.list[10].dt
                  dayTwoDate = moment(currentDate).add(2, 'd');
                  dayTwoDateEl.innerHTML = dayTwoDate.format("MM/DD/YY");
                  var dayTwoIconCode = data.list[10].weather[0].icon
                  var dayTwoIconUrl = `http://openweathermap.org/img/w/${dayTwoIconCode}.png`
                  dayTwoIcon.src = dayTwoIconUrl
                  dayTwoTempEl.innerHTML = "Temp: " + data.list[10].main.temp + ' \u00B0F';
                  dayTwoWindEl.innerHTML = "Wind: " + data.list[10].wind.speed + ' mph';
                  dayTwoHumidEl.innerHTML = "Humidity: " + data.list[10].main.humidity + "%";

                  //Day 3 Card Display
                  var dayThreeCode = data.list[19].dt
                  dayThreeDate = moment(currentDate).add(3, 'd');
                  dayThreeDateEl.innerHTML = dayThreeDate.format("MM/DD/YY")
                  var dayThreeIconCode = data.list[19].weather[0].icon
                  var dayThreeIconUrl = `http://openweathermap.org/img/w/${dayThreeIconCode}.png`
                  dayThreeIcon.src = dayThreeIconUrl
                  dayThreeTempEl.innerHTML = "Temp: " + data.list[19].main.temp + ' \u00B0F';
                  dayThreeWindEl.innerHTML = "Wind: " + data.list[19].wind.speed + ' mph';
                  dayThreeHumidEl.innerHTML = "Humidity: " + data.list[19].main.humidity + "%";

                  //Day 4 Card Display
                  var dayFourCode = data.list[27].dt
                  dayFourDate = moment(currentDate).add(4, 'd');
                  dayFourDateEl.innerHTML = dayFourDate.format("MM/DD/YY")
                  var dayFourIconCode = data.list[27].weather[0].icon
                  var dayFourIconUrl = `http://openweathermap.org/img/w/${dayFourIconCode}.png`
                  dayFourIcon.src = dayFourIconUrl
                  dayFourTempEl.innerHTML = "Temp: " + data.list[27].main.temp + ' \u00B0F';
                  dayFourWindEl.innerHTML = "Wind: " + data.list[27].wind.speed + ' mph';
                  dayFourHumidEl.innerHTML = "Humidity: " + data.list[27].main.humidity + "%";

                  //Day 5 Card Display
                  var dayFiveCode = data.list[35].dt
                  dayFiveDate = moment(currentDate).add(5, 'd');
                  dayFiveDateEl.innerHTML = dayFiveDate.format("MM/DD/YY")
                  var dayFiveIconCode = data.list[35].weather[0].icon
                  var dayFiveIconUrl = `http://openweathermap.org/img/w/${dayFiveIconCode}.png`
                  dayFiveIcon.src = dayFiveIconUrl
                  dayFiveTempEl.innerHTML = "Temp: " + data.list[35].main.temp + ' \u00B0F';
                  dayFiveWindEl.innerHTML = "Wind: " + data.list[35].wind.speed + ' mph';
                  dayFiveHumidEl.innerHTML = "Humidity: " + data.list[35].main.temp + "%";

                })
            }
        })
}


        




// Button event listeners
searchBtn.addEventListener("click", currentWeather);
searchBtn.addEventListener("click", addArray);
