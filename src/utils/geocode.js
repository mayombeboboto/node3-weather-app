const request = require('request')

const geocode = (address, callback) => {
  const geoKey = 'pk.eyJ1IjoiZ3JhZGllIiwiYSI6ImNrZnBleXJqYjBrbGwycGxoc2xnMGNoMGsifQ.aNxqg52D9ZxOF_WX3Yl8kQ'
  const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + 
    '.json?access_token=' + geoKey +'&limit=1'

    request({url: geocodeURL, json: true}, (error, { body } = {}) => {
      if(error) {
        callback('Unable to connect to location service!', undefined)
      }else if(body.error || body === undefined) {
        callback('Unable to find location', undefined)
      } else if(body.features.length === 0) {
        callback('Unable to find location. Try another search.', undefined)
      } else {
        const longitude = body.features[0].center[0]
        const latitude = body.features[0].center[1]
        const location = body.features[0].place_name
        callback(undefined, { latitude, longitude, location })
      }
    })
}

module.exports = geocode