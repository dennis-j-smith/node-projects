const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static dir to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
      title: 'Weather App',
      name: 'Dennis'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
      title: 'About Me',
      name: 'Dennis'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
      title: 'Help Page',
      helpmsg: 'My help message',
      name: 'Dennis'
    })
})

app.get('/weather', (req, res) => {
    res.send({
      Location: "Baltimore",
      Temp: 47
    })
})

app.get('/help/*', (req, res) => {
    res.render('notfound', {
      title: 'Not Found',
      msg: 'Help Article not found.',
      name: 'Dennis'
    })
})

app.get('*', (req,res) => {
  res.render('notfound', {
    title: 'Not Found',
    msg: 'Page not found.',
    name: 'Dennis'
  })
})

app.listen(3000, () => {
  console.log('Server is up on port 3000')
})
