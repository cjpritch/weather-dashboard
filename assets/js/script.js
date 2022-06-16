// Current Searched City 
var searchInput = document.getElementById("search-input");
var savedSearchesEl = document.getElementById("prev-search");
var searchBtn = document.getElementById("search-btn");

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

}









searchBtn.addEventListener("click", currentWeather);
//searchBtn.addEventListener("click", addToArray);