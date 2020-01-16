const request = require('request')

const forecast = (latitude, longitude, callback) => {

  const url = 'https://api.darksky.net/forecast/ce6415e8d73d379ccb9a9a393e9bd371/' + latitude + ',' + longitude + '?units=us'

  request({url: url, json: true}, (error, response) => {

        if (error)
        {
            callback("Unable to get weather...")
        }
        else if (response.body.error)
        {
            callback(response.body.error)
        }
        else
        {

          const data = response.body
          callback(undefined, {
              temp: data.daily.data[0].summary + ' It is currently ' + data.currently.temperature + ' degrees out.',
              precip: 'There is ' + data.currently.precipProbability + ' % chance of precipitation.',
              summary: 'Summary: ' + data.daily.summary
          })
        }
      })
}

module.exports = forecast
