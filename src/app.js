const path = require('path')
const express = require('express')

const publicDirectoryPath = path.join(__dirname, '../public')
console.log(publicDirectoryPath)

const app = express()

app.use(express.static(publicDirectoryPath))

app.get('/', (req, res) => {
  res.send('<h1>Weather</h1>')
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