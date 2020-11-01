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
      const { current } = body
      const { temperature, feelslike } = current
      const message = `The temperature is ${temperature} and it feels like ${feelslike}`
      callback(undefined, message)
    }
  })
}

module.exports = forecast