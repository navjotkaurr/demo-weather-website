const axios = require('axios')

const geocode = (latitude, longitude, callback) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=40af0b5acb366a5ad933804ea95d15a8`;
  
  
  axios.get(url)
  .then(response => {
    const weatherDescription = response.data.weather[0].description;
    callback(null,
      {weather: weatherDescription}
      );
  })
  
  .catch(error => {
    if (error.code === 'ENOTFOUND') {
      callback('Unable to connect')
    } else if(error.code === 'ERR_BAD_REQUEST') {
      callback('Unable to find location. Try another search');
    }
  });
  };
  
module.exports = geocode;
