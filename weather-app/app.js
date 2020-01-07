const request = require('request')

const url = 'https://api.darksky.net/forecast/ce6415e8d73d379ccb9a9a393e9bd371/39.5359,-76.3483?units=us&lang=es'

request({url: url, json: true}, (error, response) => {
    const data = response.body
    console.log(data.daily.data[0].summary + ' It is currently ' + data.currently.temperature + ' degrees out.')
    console.log('There is ' + data.currently.precipProbability + ' % chance of rain.')

    console.log('Summary: ' + data.daily.summary)
})
