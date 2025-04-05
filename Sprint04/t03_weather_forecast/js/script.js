const API_KEY = '12ec438339e272d756e2a1e9872827a0'
const CITY = 'Wroclaw'
const API_URL = `https://api.openweathermap.org/data/2.5/forecast?q=${CITY}&units=metric&appid=${API_KEY}`

const cityNameEl = document.getElementById('city-name');
const forecastContainerEl = document.getElementById('forecast-container');

function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    return `${day}.${month}`;
}

function getWeatherImagePath(weatherCode) {
    if (weatherCode >= 200 && weatherCode < 300)  return 'assets/images/гроза.png';
    else if (weatherCode >= 500 && weatherCode < 600) return 'assets/images/дощ.png' 
    else if (weatherCode >= 600 && weatherCode < 700) return 'assets/images/сніг.png';
    else if (weatherCode >= 700 && weatherCode < 800) return 'assets/images/туман.png';
    else if (weatherCode === 800) return 'assets/images/яснаПогода.png';
    else if (weatherCode >= 801 && weatherCode < 900) return 'assets/images/хмарно.png'
}

function hasRainOrSnow(weatherCode) {
    return (weatherCode >= 200 && weatherCode < 700);
}

function createForecastDayElement(date, tempCelsius, weatherCode) {
    const forecastDayEl = document.createElement('div');
    forecastDayEl.className = 'forecast-day';
    
    const formattedDate = formatDate(date);
    
    const temperature = Math.round(tempCelsius);
    
    const weatherImagePath = getWeatherImagePath(weatherCode);
    
 let weatherHTML = `
    <div class="weather-card-information">
        <div class="date">${formattedDate}</div>
        <div class="weather-icon">
            <img src="${weatherImagePath}" alt="Weather icon">
        </div>
        <div class="temperature">${temperature > 0 ? `+${temperature}°`:`${temperature}°`}</div>
    </div>
`;

forecastDayEl.innerHTML = weatherHTML;
return forecastDayEl;
}

function filterForecastData(forecastList) {
    const dailyForecasts = {};
    const today = new Date();
    let daysCount = 0;
    const MAX_DAYS = 6; 

    for (let item of forecastList) {
        const forecastDate = new Date(item.dt * 1000);
        const dateKey = forecastDate.toDateString();
        
        if (!dailyForecasts[dateKey] && daysCount < MAX_DAYS) {
            dailyForecasts[dateKey] = {
                date: forecastDate,
                temp: item.main.temp,
                weatherCode: item.weather[0].id
            };
            daysCount++;
        }
    }

    return Object.values(dailyForecasts).sort((a, b) => a.date - b.date);
}

async function fetchWeatherData() {
    try {
        const response = await fetch(API_URL);
        
        if (!response.ok) {
            throw new Error('Не вдалося завантажити дані про погоду');
        }

        const data = await response.json();
        cityNameEl.textContent = data.city.name;
        const filteredForecast = filterForecastData(data.list);
        forecastContainerEl.innerHTML = '';

        filteredForecast.forEach(forecast => {
            const forecastEl = createForecastDayElement(
                forecast.date,
                forecast.temp,
                forecast.weatherCode
            );
            forecastContainerEl.appendChild(forecastEl);
        });

    } catch (error) {
        console.error('Помилка при завантаженні даних про погоду:', error);
        cityNameEl.textContent = 'Помилка завантаження';
    }
}

document.addEventListener('DOMContentLoaded', fetchWeatherData);