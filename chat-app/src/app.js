const path = require('path')

const express = require('express')
const publicDirectoryPath = path.join(__dirname, '../public')
const app = express()


app.use(express.json())
// Setup static dir to serve
app.use(express.static(publicDirectoryPath)) 

module.exports = app
