const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetail = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', () => {
    const APIKey = 'bcc314cfbc0145fe843fe4fd977c3383';
    const city = document.querySelector('.search-box input').value;

    if (city === '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {
           
             if (json.cod === '404') {
             container.style.height='400px';
             error404.classList.add('active');
             weatherBox.classList.remove('active');
             weatherDetail.classList.remove('active');
             return;
             }
             container.style.height='500px';
             error404.classList.remove('active');
             weatherBox.classList.add('active');
             weatherDetail.classList.add('active');


            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'images/clear.png';
                    break;
                case 'Rain':
                    image.src = 'images/rain.png';
                    break;
                case 'Mist':
                    image.src = 'images/mist.png';
                    break;
                case 'Clouds':
                    image.src = 'images/cloud.png';
                    break;
                case 'Snow':
                    image.src = 'images/snow.png';
                    break;
                case 'Haze':
                    image.src = 'images/mist.png';
                    break;
                default:
                    image.src = 'images/cloud.png';
            }

            temperature.innerHTML = `${parseInt(json.main.temp)} <span>°C</span>`;
            description.innerHTML = json.weather[0].description;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}<span>Km/h</span> `;

            weatherBox.style.display = '';
            weatherDetail.style.display = '';
        })
        .catch(error => {
            console.error('Error fetching the weather data:', error);
            alert('An error occurred while fetching the weather data.');
        });
});
