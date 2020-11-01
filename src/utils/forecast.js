const request = require('request')


const forecast = (latitude, longitude, callback) => {
  const weatherKey = '30e2bf23c6cceceff131cd470cc2aac1'
  const weatherURL = 'http://api.weatherstack.com/current?access_key='+ weatherKey + '&query=' + 
  encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) + '&units=m'

  request({url: weatherURL, json: true}, (error, { body } = {}) => {
    if(error) {
      callback('Unable to connect to weather service!', undefined)
    } else if(body.error) {
      callback('Unable to find location', undefined)
    } else {
      console.log(body)
      const { current } = body
      const { temperature, humidity, weather_descriptions } = current
      const weather_description = weather_descriptions[0]
      const message = `${weather_description}. The temperature is ${temperature} and the humidity is of ${humidity}%`
      callback(undefined, message)
    }
  })
}

module.exports = forecast