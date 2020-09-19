const env = require('dotenv').config();
const path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
const cors = require('cors');
const axios = require("axios");
const app = express()

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

const getWeatherForecast = async (destinationDetails) => {
    const weatherForecastAPIUrl = `http://api.weatherbit.io/v2.0/forecast/daily?lat=${destinationDetails.lat}&lon=${destinationDetails.lng}&key=${process.env.WEATHERBIT_API_KEY}`;
    try {
        const res = await axios.get(weatherForecastAPIUrl);
        console.log(res.data);
        return res.data;
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
    const weatherForecast = await getWeatherForecast(req.body.destinationDetails);
    res.send(weatherForecast);
})

