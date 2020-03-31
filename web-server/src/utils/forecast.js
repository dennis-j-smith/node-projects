const request = require('request')

const forecast = (latitude, longitude, callback) => {

  const url = 'https://api.darksky.net/forecast/ce6415e8d73d379ccb9a9a393e9bd371/' + latitude + ',' + longitude + '?units=us'

  request({url, json: true}, (error, {body}) => {

        if (error)
        {
            callback("Unable to get weather...")
        }
        else if (body.error)
        {
            callback(body.error)
        }
        else
        {      
          console.log(body)
          callback(undefined, {
              temp: 'It is currently ' + body.currently.temperature + ' degrees out. ',
              wind: 'Current Wind Speed: ' + body.currently.windSpeed + ' ',
              precip: 'There is ' + body.currently.precipProbability + ' % chance of precipitation.',
              summary: 'Summary: ' + body.daily.summary
          })
        }
      })
}

module.exports = forecast
