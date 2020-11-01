const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')
const express = require('express')
const path = require('path')
const hbs = require('hbs')
const app = express()
const PORT = process.env.PORT || 3000


// Define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
  res.render('index', {
    title: 'weather',
    author: 'Gradie Mayombe'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'weather',
    author: 'Gradie Mayombe'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'weather',
    text: 'This is some helpful text.',
    author: 'Gradie Mayombe'
  })
})

app.get('/weather', (req, res) => {
  const address = req.query.address
  if(!address) {
    return res.send({
      error: 'Address missing'
    })
  }
  geocode(address, (error, { longitude, latitude, location } = {}) => {
    if(error) {
      return res.send({ error })
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if(error) {
        console.log(error)
        return res.send({ error })
      }
      res.send({
        forecast: forecastData,
        location,
        address
      })
    })
  })
})

app.get('/products', (req, res) => {
  if(!req.query.search) {
    return res.send({
      error: 'You must provide search term'
    })
  }
  console.log(req.query.search)
  res.send({
    products: []
  })
})

// 404 pages
app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    author: 'Gradie Mayombe',
    errorMessage: 'Help article not found'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    author: 'Gradie Mayombe',
    errorMessage: 'Page not found.'
  })
})

app.listen(PORT, () => {
  console.log('Server is up on port ' + PORT)
})