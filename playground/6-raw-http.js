const https = require('https')


const url = 'https://api.darksky.net/forecast/ce6415e8d73d379ccb9a9a393e9bd371/40,-75'

const request = https.request(url, (response) => {
    let data = ''

    response.on('data', (chunk) => {
      data = data + chunk.toString();

    })

    response.on('end', () => {
        const body = JSON.parse(data);
        console.log(body)
      }
    )
})

request.on('error', (error) => {
    console.log(error)
})

request.end()
