let cities = [];

let citySearch = document.querySelector("#search-city");
let cityInput = document.querySelector("#city");
let currentWeather = document.querySelector("#current-weather");
let searchedCity = document.querySelector("#city-searched");
let dayForecast = document.querySelector("#day-forecast");
let forecastContainer = document.querySelector("#five-day-container");
let previousSearchButton = document.querySelector("#previous-search-button")

let formSubmitHandler = function(event){
    event.preventDefault();
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
    previousSearch(city);
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
    searchedCity.textContent = searchForCity;

    let currentDate = document.createElement("span")
    currentDate.textContent = " (" + moment(weather.dt.value).format("MMM D, YYYY") + ") ";
    searchedCity.appendChild(currentDate);

    let weatherIcon = document.createElement("img")
    weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`);
    searchedCity.appendChild(weatherIcon);

    let tempEl = document.createElement("span");
    tempEl.textContent = "Temperature: " + weather.main.temp + " °F";
    tempEl.classList = "list-group"
    currentWeather.appendChild(tempEl);

    let humidityEl = document.createElement("span");
    humidityEl.textContent = "Humidity: " + weather.main.humidity + " %";
    humidityEl.classList = "list-group"
    currentWeather.appendChild(humidityEl);

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
let displayUvIndex = function(index){
    let uvIndexEl = document.createElement("div");
    uvIndexEl.textContent = "UV Index: "
    uvIndexEl.classList = "list-group"

    uvIndexValue = document.createElement("span")
    uvIndexValue.textContent = index.value

    if(index.value <=2) {
        uvIndexValue.classList = "bg-success text-light"
    } else if (index.value > 2 && index.value <=8){
        uvIndexValue.classList = "bg-warning text-dark"
    } else if(index.value > 8){
        uvIndexValue.classList = "bg-danger text-light"
    }

    uvIndexEl.appendChild(uvIndexValue);
    currentWeather.appendChild(uvIndexEl);
}

let get5Day = function(city){
    let apiKey = "844421298d794574c100e3409cee0499"
    let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`

    fetch(apiUrl)
    .then(function(response){
        response.json().then(function(data){
            display5Day(data);
        });
    });
}

let display5Day = function(weather){
    forecastContainer.textContent = '';
    dayForecast.textContent = " Five - Day Forecast";

    let forecast = weather.list;
        for(let i =5; i < forecast.length; i=i+8){
            let dailyForecast = forecast[i];

    let forecastEl = document.createElement("div");
    forecastEl.classList = "card bg-primary text-light m-2"

    let forecastDate = document.createElement("h4")
    forecastDate.textContent = moment.unix(dailyForecast.dt).format("MMM D, YYYY");
    forecastDate.classList = "card-header text-center"
    forecastEl.appendChild(forecastDate);


    let weatherIcon = document.createElement("img")
    weatherIcon.classlist = "card-body text-center";
    weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${dailyForecast.weather[0].icon}@2x.png`); 
    forecastEl.appendChild(weatherIcon);


    let forecastTempEl = document.createElement("span");
    forecastTempEl.classList = "card-body text-center";
    forecastTempEl.textContent = dailyForecast.main.temp + " °F";
    forecastEl.appendChild(forecastTempEl);

    let forecastHumidEl = document.createElement("span");
    forecastHumidEl.classList = "card-body text-center";
    forecastHumidEl.textContent = dailyForecast.main.humidity + " %";

    forecastEl.appendChild(forecastHumidEl);

    forecastContainer.appendChild(forecastEl);
    }
}

let previousSearch = function(previousSearch){

    previousSearchEl = document.createElement("button");
    previousSearchEl.textContent = previousSearch;
    previousSearchEl.classList = "d-flex w-100 btn-light border p-2"
    previousSearchEl.setAttribute("data-city", previousSearch)
    previousSearchEl.setAttribute("type", "submit");

    previousSearchButton.prepend(previousSearchEl);
}
let previousSearchHandler = function(event){
    let city = event.target.getAttribute("data-city")
    if(city){
        getCityWeather(city);
        get5Day(city);
    }
}

citySearch.addEventListener("submit", formSubmitHandler);
previousSearchButton.addEventListener("click", previousSearchHandler);