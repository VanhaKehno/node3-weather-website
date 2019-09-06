const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Mikko Torniainen'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    name: 'Mikko Torniainen',
    title: 'About me'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    help: 'This is help text',
    name: 'Mikko Torniainen',
    title: 'Help'
  })
})

app.get('/weather', (req, res) => {
  res.send({
    location:'Muurame',
    weather: "Rainy as fuck"
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    errorMessage: "Help article not found",
    name: 'Mikko Torniainen'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    errorMessage: 'Page not found',
    name: 'Mikko Tornianen',
  })
})

app.listen(3000, () => {
  console.log('Server is up on port 3000.')
})