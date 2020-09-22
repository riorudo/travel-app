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
const countyCodeAPIUrl = 'https://restcountries.eu/rest/v2/all';

// Helper functions
const getCountryCodes = async () => {
    try {
        const res = await axios.get(countyCodeAPIUrl);
        const data = res.data.map((item) => {
            return {name: item.name, alpha2Code: item.alpha2Code.toLowerCase()};
        });
        return data;
    } catch (e) {
        console.log("error", e);
    }
};

const getCities = async (city) => {
    const citiesAPIUrl = `http://api.geonames.org/searchJSON?q=${city}&maxRows=7&username=${process.env.GEONAMES_TOKEN}`;
    try {
        const res = await axios.get(citiesAPIUrl);
        console.log(res.data.geonames);
        return res.data.geonames;
    } catch (e) {
        console.log("error", e);
    }
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

const getWeatherForecast = async (destinationDetails) => {
    const weatherForecastAPIUrl = `http://api.weatherbit.io/v2.0/forecast/daily?lat=${destinationDetails.lat}&lon=${destinationDetails.lng}&key=${process.env.WEATHERBIT_API_KEY}`;
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
        console.log("error", e);
    }
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
    console.log(req.body);
    let data = {};
    data.weather = await getWeatherForecast(req.body.destinationDetails);
    data.weather.name = req.body.destination;
    data.form = req.body;
    res.send(data);
})

