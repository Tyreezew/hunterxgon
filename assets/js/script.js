let citites = [];

let citySearch = document.querySelector("#search-city");
let cityInput = document.querySelector("#city");
let currentWeather = document.querySelector("#current-weather");
let searchedCity = document.querySelector("#city-searched");
let dayforecast = document.querySelector("#day-forecast");
let forecastContainer = document.querySelector("#five-day-container");
let previousSearch = document.querySelector("#previous-search-button")

submitHandler = function(event){
    event.preventDefault();
    let city = cityInput.ariaValueMax.trim();
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