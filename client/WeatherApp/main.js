import './style.css'
import axios from 'axios'


const weatherForm = document.querySelector('form')
const locationText = document.querySelector('#location')

function getWeather(e) {
    e.preventDefault()
    const location = locationText.value

    // GET request for remote image in node.js
    axios({
        method: 'get',
        url: `http://localhost:3000?location=${location}`,
        responseType: 'json'
    })
        .then(function (response) {
            try {
                const locationData = {
                    name: response.data.data.location.name,
                    time: response.data.data.location.localtime
                }

                const weatherData = {
                    tempC: response.data.data.current.temp_c,
                    condition: response.data.data.current.condition,
                    wind: response.data.data.current.wind_mph,
                    humidity: response.data.data.current.humidity
                }
                setLocalStorage(locationData, weatherData)
                appendWeatherData(locationData, weatherData)

            }
            catch {
                alert("Error Occurred Please Enter Correct Name")
            }

        });
}

function createWindAndHumidity(weatherData) {

    // Remove existing container if it exists
    if (document.querySelector('#weather-container')) {
        document.querySelector('#weather-container').innerHTML = '';
    }

    weatherData = getWeatherData()

    const container = document.createElement('div');
    container.id = "weather-container"
    container.classList.add("flex", "justify-between", "items-center", "mt-5");

    // Creating elements for the humidity 
    const humidity = document.createElement('div');
    humidity.classList.add("flex", "items-center");

    const humidityImg = document.createElement('img');
    humidityImg.src = "./public/humidity.svg";
    humidityImg.alt = "Humidity percentage";
    humidityImg.width = 50;

    const humidityText = document.createElement('p');
    humidityText.classList.add("font-bold", "text-gray-900", "text-3xl");
    humidityText.textContent = `${weatherData.humidity}%`;

    humidity.appendChild(humidityImg);
    humidity.appendChild(humidityText);

    // Creating elements for the wind
    const wind = document.createElement('div');
    wind.classList.add("flex", "items-center");

    const windImg = document.createElement('img');
    windImg.src = "./public/wind.svg";
    windImg.alt = "Wind speed";
    windImg.width = 50;

    const windText = document.createElement('p');
    windText.classList.add("font-bold", "text-gray-900", "text-3xl");
    windText.textContent = `${weatherData.wind}km/h`;

    wind.appendChild(windImg);
    wind.appendChild(windText);

    // Append wind and humidity to the container
    container.appendChild(humidity);
    container.appendChild(wind);

    console.log(weatherData)

    document.querySelector('h3').appendChild(container)


}

function createWeatherAndTemp(locationData, weatherData) {
    // Remove existing container if it exists
    if (document.querySelector('#temp-location-div')) {
        document.querySelector('#temp-location-div').innerHTML = '';
    }

    locationData = getLocationData()
    weatherData = getWeatherData()

    const temp = weatherData.tempC;
    const location = locationData.name;

    const h1 = document.createElement('h1');
    h1.classList.add('block', 'text-6xl', 'font-bold', 'text-gray-800', 'dark:text-white', 'text-center');
    h1.textContent = `${temp}°C`;

    const h3 = document.createElement('h3');
    h3.classList.add('block', 'text-5xl', 'mt-3', 'font-bold', 'text-gray-800', 'dark:text-white', 'text-center')
    h3.textContent = location;

    document.querySelector('#temp-location-div').appendChild(h1);
    document.querySelector('#temp-location-div').appendChild(h3);
}

function createWeatherImage(weatherData) {
    const pageTitle = document.querySelector('#page-title'); // or document.getElementById('pageTitle')

    weatherData = getWeatherData()

    if (document.querySelector('#weather-image')) {
        document.querySelector('#weather-image').remove(); // remove the element entirely
    }

    const image = document.createElement('img');
    image.src = weatherData.condition.icon;
    image.classList.add('w-1/2', 'mx-auto');
    image.id = 'weather-image'

    pageTitle.appendChild(image);
}

function setLocalStorage(locationData, weatherData) {
    localStorage.setItem('locationData', JSON.stringify(locationData))
    localStorage.setItem('weatherData', JSON.stringify(weatherData))
}

function getLocationData() {
    const locationData = localStorage.getItem('locationData');
    if (locationData) {
        console.log("In the get weather data")
        return JSON.parse(locationData);
    } else {
        console.log('The location is not in the local storage');
        return {}; // return empty object if not found
    }
}

function getWeatherData() {
    const weatherData = localStorage.getItem('weatherData');
    if (weatherData) {
        console.log("IN the get weather data")
        return JSON.parse(weatherData);
    } else {
        console.log('The weather is not in the local storage');
        return {}; // return empty object if not found
    }
}


function appendWeatherData(locationData, weatherData) {
    createWeatherAndTemp(locationData, weatherData);
    createWindAndHumidity(weatherData);
    createWeatherImage(weatherData)
}

function render(locationData, weatherData) {
    if (!locationData || !weatherData) {
        locationData = getLocationData();
        weatherData = getWeatherData();
    }

    appendWeatherData(locationData, weatherData);
}

document.addEventListener('DOMContentLoaded', render)
weatherForm.addEventListener('submit', getWeather)