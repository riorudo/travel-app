const env = require('dotenv').config();
const path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
const cors = require('cors');
const axios = require("axios");
const app = express()
// Require moment to format date
const moment = require('moment');

app.use(express.static('../../dist'))
app.use(cors());

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Global variables
let projectData = {
    countryCodes: [],
    recentEntries: []
};

// External API calls
const getCities = async (city) => {
    const citiesAPIUrl = `http://api.geonames.org/searchJSON?q=${city}&maxRows=7&username=${process.env.GEONAMES_TOKEN}`;
    try {
        const res = await axios.get(citiesAPIUrl);
        return res.data.geonames;
    } catch (e) {
        console.log("error", e);
    }
}

async function getWeatherNormals(date, destinationDetails) {
    const apiDate = formatDateForAPI(date);
    const weatherForecastAPIUrl = encodeURI(`https://api.weatherbit.io/v2.0/normals?lat=${destinationDetails.lat}&lon=${destinationDetails.lng}&start_day=${apiDate}&end_day=${apiDate}&key=${process.env.WEATHERBIT_API_KEY}`);
    try {
        const res = await axios.get(weatherForecastAPIUrl);
        const data = {};
        data.coords = {};
        if (!res.data) {
            return data;
        }
        data.coords.latitude = res.data.lat;
        data.coords.longitude = res.data.lon;
        if (res.data.data && res.data.data.length > 0 ) {
            data.min_temp = res.data.data[0].min_temp;
            data.max_temp = res.data.data[0].max_temp;
            data.min_wind_spd = res.data.data[0].min_wind_spd;
            data.max_wind_spd = res.data.data[0].max_wind_spd;
        }
        return data;
    } catch (e) {
        console.log('error', e);
    }
}

const getWeatherForecast = async (destinationDetails) => {
    const weatherForecastAPIUrl = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${destinationDetails.lat}&lon=${destinationDetails.lng}&key=${process.env.WEATHERBIT_API_KEY}`;
    try {
        const res = await axios.get(weatherForecastAPIUrl);
        const data = {};
        data.coords = {};
        data.coords.latitude = res.data.lat;
        data.coords.longitude = res.data.lon;
        data.date = mapWeatherDataValues(res.data.data, 'datetime');
        data.minTemp = mapWeatherDataValues(res.data.data, 'min_temp');
        data.maxTemp = mapWeatherDataValues(res.data.data, 'max_temp');
        data.weatherDescription = mapWeatherDataValues(res.data.data, 'weatherDescription');
        return data;
    } catch (e) {
        console.log('error', e);
    }
}

const getCityImages = async (city) => {
    const imagesUrl = encodeURI(`https://pixabay.com/api/?key=${process.env.PIXABAY_API_KEY}&q=${city.split(' ').join('+')}&image_type=photo`);
    try {
        const res = await axios.get(imagesUrl);
        const data = {
            url: 'https://pixabay.com/get/50e0d5474355b10ff3d8992cc620337f163bd6e14e507749752872d6904ccd_640.jpg'
        };
        if (res.data.hits.length > 0) {
            data.url = res.data.hits[0].webformatURL;
        }
        return data;
    } catch (e) {
        console.log('error', e);
    }
}


// Helper functions
function formatDateForAPI(date) {
    return date.substring(5, 10);
}


function mapWeatherDataValues(days, key) {
    if (!days || days.length < 1) {
        return;
    }
    const dataArr = [];
    days.forEach((day) => {
        let dataItem;
        // Access nested object property over string path like 'temp.day'
        switch (key) {
            case ('datetime'):
                dataItem = moment(day.datetime).format("MM/DD/YY");
                break;
            case ('min_temp'):
                dataItem = day.min_temp;
                break;
            case ('max_temp'):
                dataItem = day.max_temp;
                break;
            case ('weatherDescription'):
                dataItem = day.weather.description;
                break;
            default:
                dataItem = [];
                break;
        }
        dataArr.push(dataItem);
    });
    return dataArr;
}

// designates what port the app will listen to for incoming requests
app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})

app.get('/cities', async function (req, res) {
    const cities = await getCities(req.query['searchValue']);
    res.send(cities);
})

app.post('/book-travel', async function (req, res) {
    let data = {};
    data.weather = await getWeatherForecast(req.body.destinationDetails);
    data.weatherDay = await getWeatherNormals(req.body.date, req.body.destinationDetails);
    data.cityImage = await getCityImages(req.body.destination);
    data.weather.name = req.body.destination;
    data.form = req.body;
    res.send(data);
})

