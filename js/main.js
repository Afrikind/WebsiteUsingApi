document.getElementById('weatherForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const city = document.getElementById('city').value;
    const weatherDisplay = document.getElementById('weatherDisplay');

    let latitude, longitude;

    switch (city) {
        case 'London':
            latitude = 51.5074;
            longitude = -0.1278;
            break;
        case 'Paris':
            latitude = 48.8566;
            longitude = 2.3522;
            break;
        case 'Berlin':
            latitude = 52.5200;
            longitude = 13.4050;
            break;
        case 'Rome':
            latitude = 41.9028;
            longitude = 12.4964;
            break;
        case 'Madrid':
            latitude = 40.4168;
            longitude = -3.7038;
            break;
        case 'Amsterdam':
            latitude = 52.3676;
            longitude = 4.9041;
            break;
        case 'Brussels':
            latitude = 50.8503;
            longitude = 4.3517;
            break;
        default:
            latitude = 51.5074;
            longitude = -0.1278;
            break;
    }

    const apiUrl = `http://www.7timer.info/bin/api.pl?lon=${longitude}&lat=${latitude}&product=civil&output=json`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const forecasts = data.dataseries;
            weatherDisplay.innerHTML = '<h2>7-Day Weather Forecast</h2>';
            forecasts.forEach((forecast, index) => {
                if (index < 7) {
                    const date = new Date(forecast.date);
                    weatherDisplay.innerHTML += `
                        <div>
                            <h3>${date.toDateString()}</h3>
                            <p>Temperature: ${forecast.temp2m.min}°C - ${forecast.temp2m.max}°C</p>
                            <p>Weather: ${forecast.weather}</p>
                        </div>
                    `;
                }
            });
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            weatherDisplay.innerHTML = '<p>Error fetching weather data. Please try again later.</p>';
        });
});
