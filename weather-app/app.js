const request = require('request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')



geocode ('Ozark', (error, data) => {
    console.log("Error: ", error)
    console.log("Data: ", data)
})

forecast(31.4585, -85.6406, (error, data) => {
    console.log("Error: ", error)
    console.log("Data: ", data)
})
