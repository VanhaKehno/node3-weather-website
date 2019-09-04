const path = require('path')
const express = require('express')

console.log(__dirname)
const publicDirectoryPath = path.join(__dirname, '../public')

const app = express()

app.use(express.static(publicDirectoryPath))

app.get('/', (req, res) => {
  res.send('<h1>Weather</h1>')
})

app.get('/help', (req, res) => {
  res.send([{
    name: 'Mikko',
    age: 39
  }, {
    name: 'Pertti',
  }])
})

app.get('/about', (req, res) => {
  res.send('<title>About</title><h1>About</h1>')
})

app.get('/weather', (req, res) => {
  res.send({
    location:'Muurame',
    weather: "Rainy as fuck"
  })
})


app.listen(3000, () => {
  console.log('Server is up on port 3000.')
})