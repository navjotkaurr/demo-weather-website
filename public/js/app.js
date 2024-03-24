document.addEventListener('DOMContentLoaded', () => {
    const weatherForm = document.querySelector('#weatherForm');
    const latitudeInput = document.querySelector('#latitudeInput');
    const longitudeInput = document.querySelector('#longitudeInput');
    const messageOne = document.querySelector('#message-1');
    const messageTwo = document.querySelector('#message-2')
    

    weatherForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const latitude = latitudeInput.value;
        const longitude = longitudeInput.value;

        messageOne.textContent = 'Loading...'
        messageTwo.textContent = ''

        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=40af0b5acb366a5ad933804ea95d15a8`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Unable to fetch weather data')
                }
                return response.json();
            })
            .then((data) => {
                // Accessing latitude and longitude from the coord object
                messageOne.textContent = `Temperature ${data.main.temp}`;
                messageTwo.textContent = `Weather: ${data.weather[0].description}`;
            })
            .catch((error) => {
                console.error('Error:', error.message);
                messageOne.textContent = 'Error fetching weather data.';
            });
    });
});
