const axios = require('axios')

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=40af0b5acb366a5ad933804ea95d15a8`;
  
  
  axios.get(url)
  .then(response => {
    const visibility = response.data.visibility;
    const wind = response.data.wind.speed;
    callback(null,
      {weather: `The visibility is currently ${visibility} and the speed of wind is ${wind}`}
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
  
module.exports = forecast;
