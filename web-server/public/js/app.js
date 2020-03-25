console.log('Client side JS is loaded')



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message1')
const message2 = document.querySelector('#message2')

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const location = search.value
  console.log(location)
  message1.textContent = 'Loading...'
  message2.textContent = ''
  fetch('http://localhost:3000/weather?address=' + location).then((response) => {

      response.json().then((data) => {
        if (data.error) {
          message1.textContent = data.error
        }
        else  {
          message1.textContent = data.location
          console.log(data.forecast)
          message2.textContent = data.forecast.temp
        }
      })
  })
})
