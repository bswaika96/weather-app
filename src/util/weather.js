if(process.env.NODE_ENV !== 'production')
    require('dotenv').config()
const fetch = require('node-fetch')

const getWeather = async ({location, place}) => {
    if(!location){
        throw new Error('missing required parameter : location')
    }

    const API_KEY = process.env.DARKSKY_KEY
    const API_URL = process.env.DARKSKY_URL + `${API_KEY}/${location}?units=si`

    const data = await fetch(API_URL)
                        .then((res) => res.json())
    
    
    if(!data.error){
        const {timezone, currently, daily} = data

        return {
            location,
            place,
            timezone,
            weather: currently,
            forecast: {
                summary: daily.summary,
                icon: daily.icon,
                data: daily.data
            }
        }
    }else{
        throw new Error(data.error.toLowerCase())
    }
}

module.exports = getWeather