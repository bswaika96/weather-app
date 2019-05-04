if(process.env.NODE_ENV !== 'production')
    require('dotenv').config()
const express = require('express')

//const {getWeather, postWeather} = require('./src/controllers')
const getWeatherMiddleWare = require('./src/middlewares')
const {at} = require('./src/util')

const app = express()

const port = process.env.PORT || 3000

app.set('view engine', 'pug')
app.set('views', at('src/views'))

app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(express.static(at('public')))

app.all('/', getWeatherMiddleWare, (req, res) => {
    res.render('index', {data: req.body.weatherData})
})

//app.get('/api/weather', getWeather)

//app.post('/api/weather', postWeather)

app.listen(port, () => {
    console.log('Listening on port '+ port + '...')
})