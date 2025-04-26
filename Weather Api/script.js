const apiKey = "b359f54d5c55bc42bce549c64a03e133"; // your API key
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const errorMsg = document.getElementById("errorMsg");
const weatherBox = document.getElementById("weatherBox");

const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const weatherType = document.getElementById("weatherType");
const windSpeed = document.getElementById("windSpeed");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");

async function getWeather(city) {
    try {
        if (!city) {
            errorMsg.textContent = "Please enter a city name!";
            weatherBox.classList.add("hidden");
            return;
        }

        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

        if (!response.ok) {
            errorMsg.textContent = "City not found. Please try again.";
            weatherBox.classList.add("hidden");
            return;
        }

        const data = await response.json();
        console.log(data);

        cityName.textContent = `${data.name}, ${data.sys.country}`;
        temperature.textContent = `${Math.round(data.main.temp)} °C`;
        weatherType.textContent = data.weather[0].main;
        windSpeed.textContent = Math.round(data.wind.speed);

        // Sunrise and sunset
        const sunriseTime = new Date(data.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const sunsetTime = new Date(data.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        sunrise.textContent = sunriseTime;
        sunset.textContent = sunsetTime;

        errorMsg.textContent = "";
        weatherBox.classList.remove("hidden");

    } catch (error) {
        console.error(error);
        errorMsg.textContent = "An error occurred. Please try again.";
        weatherBox.classList.add("hidden");
    }
}

searchBtn.addEventListener('click', () => {
    getWeather(cityInput.value.trim());
    cityInput.value = "";
});

cityInput.addEventListener('keydown', (e) => {
    if (e.key === "Enter") {
        searchBtn.click();
    }
});
