const request = require('request')

const forecast = (latitude, longitude, callback) => {
  const url = 'https://api.darksky.net/forecast/f848676a09c4d984700bcf6e92c50b5b/' 
    + encodeURIComponent(latitude) 
    + ','
    + encodeURIComponent(longitude) + 
    '?units=si&lang=en';

  request({url, json: true}, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather service!', undefined)
    } else if (body.code) {
      callback(body.error, undefined)
    } else {
      callback(undefined, {
        summary: body.daily.data[0].summary,
        currently: 'It is currently ' 
          + body.currently.temperature 
          + ' degrees out. There is '
          + body.currently.precipProbability 
          + '% chance of rain',
        windSpeed: body.currently.windSpeed
      });
    }
  });
}

module.exports = forecast