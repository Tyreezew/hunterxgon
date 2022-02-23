let citites = [];

let citySearch = document.querySelector("#search-city");
let cityInput = document.querySelector("#city");
let currentWeather = document.querySelector("#current-weather");
let searchedCity = document.querySelector("#city-searched");
let dayforecast = document.querySelector("#day-forecast");
let forecastContainer = document.querySelector("#five-day-container");
let previousSearch = document.querySelector("#previous-search-button")

submitHandler = function(evt){
    evt.preventDefault();
    let city = cityInput.value.trim();
    if(city){
        getCityWeather(city);
        get5Day(city);
        cities.unshift({city});
        cityInput.value = '';
    } else {
        alert ("Please enter a City");
    }
    saveSearch();
    pastSearch(city);
}
let saveSearch = function() {
    localStorage.setItem("cities", JSON.stringify(cities));
};

let getCityWeather = function(city){
    let apiKey = "844421298d794574c100e3409cee0499"
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

    fetch(apiUrl)
    .then(function(response){
        response.json().then(function(data){
            displayWeather(data, city);
        });
    });
};

let displayWeather = function(weather, searchForCity){
    currentWeather.textContent = '';
    cityInput.textContent = searchForCity;

    let currentDate = document.createElement("span")
    currentDate.textContent = " (" + moment(weather.dt.value).format("MMM D, YYYY") + ") ";
    cityInput.appendChild(currentDate);

    let weatherIcon = document.createElement("img")
    weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`);
    cityInput.appendChild(weatherIcon);

    let tempEl = document.createElement("span");
    tempEl.textContent = "Temperature: " + weather.main.temp + " °F";
    tempEl.classList = "list-group"
    currentWeather.appendChild(tempEl);

    let humidEl = document.createElement("span");
    humidEl.textContent = "Humidity: " + weather.main.humid + " %";
    humidEl.classList = "list-group"
    currentWeather.appendChild(humidEl);

    let windSpeedEl = document.createElement("span");
    windSpeedEl.textContent = "Wind Speed: " + weather.wind.speed + " °MPH";
    windSpeedEl.classList = "list-group"
    currentWeather.appendChild(windSpeedEl);

    let lat = weather.coord.lat;
    let lon = weather.coord.lon;
    getUvIndex(lat,lon)
}

let getUvIndex = function (lat,lon){
    let apiKey = "844421298d794574c100e3409cee0499"
    let apiUrl = `https://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${lat}&lon=${lon}`
    fetch(apiUrl)
    .then(function(response){
        response.json().then(function(data){
            displayUvIndex(data)
        });
    });
    
}