const {location, weather} = require('../util')

const getWeather = (req, res) => {
    location()
        .then((data) => weather(data))
        .then((data) => {
            res.send(data)
        })
        .catch((err) => {
            res.send({
                error: {
                    message: err.message.toLowerCase()
                }
            })
        })
}

const postWeather = (req, res) => {
    location('search', req.body.searchKey)
        .then((data) => weather(data))
        .then((data) => {
            res.send(data)
        })
        .catch((err) => {
            res.send({
                error: {
                    message: err.message.toLowerCase()
                }
            })
        })
}

module.exports = {
    getWeather,
    postWeather
}