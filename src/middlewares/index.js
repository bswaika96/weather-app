const {location, weather} = require('../util')

const getWeatherMiddleware = (req, res, next) => {
    const searchKey = req.body.searchKey
    if(!searchKey && req.method === 'GET'){
        location()
        .then((data) => weather(data))
        .then((data) => {
            req.body.weatherData = data
            next()
        })
        .catch((err) => {
            res.send({
                error: {
                    message: err.message.toLowerCase()
                }
            })
        })
    }else{
        location('search', searchKey)
        .then((data) => weather(data))
        .then((data) => {
            req.body.weatherData = data
            next()
        })
        .catch((err) => {
            res.send({
                error: {
                    message: err.message.toLowerCase()
                }
            })
        })
    }
}

module.exports = getWeatherMiddleware