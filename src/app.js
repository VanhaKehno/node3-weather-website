const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast.js')

const app = express()
const port = process.env.PORT || 3000

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
  if (!req.query.address){
    return res.send({
      error: 'address term must be provided'
    })
  }

  geocode(req.query.address, (error, {longitude, latitude, location} = {}) => {
    if(error) {
      return res.send({ error })
    }

    forecast(latitude, longitude, (error, { summary, currently, windSpeed }) => {
      if(error) {
        return res.send({ error })
      }

      return res.send({
        address: req.query.address,
        location,
        latitude,
        longitude,
        summary,
        forecast: currently,
        windSpeed
      })
    })
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

app.listen(port, () => {
  console.log('Server is up on port ' + port + '.')
})