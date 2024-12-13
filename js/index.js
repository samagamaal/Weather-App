// Get elements
let todayName = document.getElementById("todayName");
let todayNum = document.getElementById("today-number");
let todayMonth = document.getElementById("today-month");
let todayLoc = document.getElementById("today-loc");
let todayTemp = document.getElementById("today-temp");
let todayHumidity = document.getElementById("today-humidity");
let todayWind = document.getElementById("today-wind");
let windDirection = document.getElementById("today-wind-direction");
let conditionImg = document.getElementById('today-condition-img');
let conditionText = document.getElementById('today-condition-text');


//search input
let searchInput = document.getElementById('search');
// Next day elements
let nextdayName = document.querySelectorAll('.nextday-Name');
let nextConditionImg = document.querySelectorAll('.next-condition-img');
let nextMaxTemp = document.querySelectorAll('.max-temp');
let nextMinTemp = document.querySelectorAll('.min-temp');
let nextConditionText = document.querySelectorAll('.next-condition-text');

// Fetch weather data
async function getWeatherData(cityName) {
    let weatherResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=861542abf3b24c62962120852242011&q=${cityName}&days=3`);
    let weatherData = await weatherResponse.json();
    return weatherData;
}

// Display today's weather data
function displayTodayData(weatherData) {
    let current = weatherData.current;
    let location = weatherData.location;

    let todayDate = new Date();
    todayName.innerHTML = todayDate.toLocaleDateString("en-US", { weekday: "long" });
    todayNum.innerHTML = todayDate.getDate();
    todayMonth.innerHTML = todayDate.toLocaleDateString("en-US", { month: "long" });

    todayLoc.innerHTML = location.name;
    todayTemp.innerHTML = `${current.temp_c}°C`;
    conditionImg.setAttribute('src', 'https:' + current.condition.icon);
    conditionText.innerHTML = current.condition.text;
    todayHumidity.innerHTML = `${current.humidity}%`;
    todayWind.innerHTML = `${current.wind_kph} km/h`;
    windDirection.innerHTML = current.wind_dir;
}

// Display next day's weather data
function displayNextDay(weatherData) {
    let forecastData = weatherData.forecast.forecastday;

    // Ensure this loop iterates over the **correct days**.
    for (let i = 1; i < forecastData.length; i++) {
        let nextDay = new Date(forecastData[i].date);

        // Day Name
        nextdayName[i - 1].innerHTML = nextDay.toLocaleDateString("en-US", { weekday: "long" });

        // Max and Min Temperatures
        nextMaxTemp[i - 1].innerHTML = `${forecastData[i].day.maxtemp_c}°C`;
        nextMinTemp[i - 1].innerHTML = `${forecastData[i].day.mintemp_c}°C`;

        // Weather Icon and Condition
        nextConditionImg[i - 1].setAttribute('src', 'https:' + forecastData[i].day.condition.icon);
        nextConditionText[i - 1].innerHTML = forecastData[i].day.condition.text;
    }
}



// Call all functions to fetch and display data
async function fetchWeather(city = 'cairo') {

    let weatherData = await getWeatherData(city);

    if (!weatherData.error) {
        displayTodayData(weatherData);
        displayNextDay(weatherData);
    }

}

// Initial call to fetch weather data
fetchWeather();

searchInput.addEventListener('input', function () {
    fetchWeather(searchInput.value)
})
