const request = require('request')

const geocode = (address, callback) => {

  const mapboxUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZHNtaXRoMTIwMTk3MyIsImEiOiJjazU0bWl5em8wMWJqM2txaTl1MzYwdW9pIn0.F6TcqLyaGsIVbLlAZ14Ilg&limit=1'
  request({url: mapboxUrl, json: true}, (error, response) => {

      if (error)
      {
          callback("Unable to connect to location services");
      }
      else if (response.body.features.length === 0)
      {
          callback("Invalid Location")
      }
      else
      {
          const data = response.body
          callback(undefined,
            {
              latitude: data.features[0].center[1],
              longitude: data.features[0].center[0],
              location:  data.features[0].place_name
            }
          )
      }
  })
}

module.exports = geocode
