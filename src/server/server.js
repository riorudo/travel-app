const path = require('path')
const express = require('express')
const axios = require('express')
const mockAPIResponse = require('./mockAPI.js')
const cors = require('cors');
const app = express()

app.use(express.static('../../dist'))
app.use(cors());

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// designates what port the app will listen to for incoming requests
app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})

app.post('/book-travel', async function (req, res) {
    res.send(mockAPIResponse);
})

