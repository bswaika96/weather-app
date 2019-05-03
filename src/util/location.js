require('dotenv').config()
const fetch = require('node-fetch')

const getLocation = async (mode, searchKey) => {
    let result, data, LOCATION_KEY, LOCATION_URL
    switch(mode){
        case 'search':
            if(!searchKey){
                throw new Error('missing required parameter : searchPhrase')
            }
            LOCATION_KEY = process.env.MAPBOX_KEY
            LOCATION_URL = process.env.MAPBOX_URL + `${encodeURI(searchKey)}.json?access_token=${LOCATION_KEY}&limit=1`
            data = await fetch(LOCATION_URL)
                                .then((res) => res.json())
                                .then((res) => res.features)
            if(data.length === 1){
                data = data[0]
                if(data.id[0] === 'c'){
                    result = {
                        location: data.center[1]+','+data.center[0],
                        place: data.properties.short_code.toUpperCase()
                    }
                }else{
                    let place = data.place_name.split(', ')
                    result = {
                        location: data.center[1]+','+data.center[0],
                        place:  place.slice(0,place.length-1).join(', ') + `, ${data.context[data.context.length-1].short_code.toUpperCase()}`
                    }
                }
            }else{
                throw new Error(`fatal error : unable to fetch location data`)
            }
        break;
        default:
            LOCATION_KEY = process.env.IPINFO_KEY
            LOCATION_URL = process.env.IPINFO_URL + `${LOCATION_KEY}`
            data = await fetch(LOCATION_URL)
                                .then((res) => res.json())
            if(!data.error){
                result = {
                    location: data.loc,
                    place: data.city + ', ' + data.region + ', ' + data.country
                }
            }else{
                throw new Error(`${data.error.title.toLowerCase()} : ${data.error.message.toLowerCase()}`)
            }
    }
    return result
}

module.exports = getLocation