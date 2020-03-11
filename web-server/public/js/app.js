console.log('Client side JS is loaded')

fetch('http://localhost:3000/weather?address=fallston').then((response) => {

    response.json().then((data) => {
      if (data.error) {
        console.log(data.error)
      }
      else  {
        console.log(data.location)
        console.log(data.forecast)
      }
    })
})
