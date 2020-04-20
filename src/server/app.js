const dotenv = require("dotenv");
dotenv.config();

var path = require("path");

const express = require("express");
const app = express();
app.use(express.static("dist"));
app.use(express.json());

const cors = require("cors");
app.use(cors());

// Use axios to fetch the data from API
const axios = require('axios');

console.log(__dirname);



app.post("/geo", function (req, res) {
    let placename = req.body.placename
    let countrybias = "US"
    let url = `http://api.geonames.org/searchJSON?&q=${placename}&countryBias=US&orderby=relevance&operator=AND&lang=en&maxRows=1&username=${process.env.GEO_API_ID}`

    console.log(url)
    axios.get(url)
    .then(function(response) {
        console.log(response.data)
        res.send(response.data)
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
})

app.post("/weather", function (req, res) {
    let longitude = req.body.longitude
    let latitude = req.body.latitude
    let url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${latitude}&lon=${longitude}&key=${process.env.WEATHER_KEY}`

    console.log(url)
    axios.get(url)
    .then(function(response) {
        console.log(response.data)
        res.send(response.data)
    })
    .catch(function (error) {
        console.log(error); // handle error
    })
})

app.post("/pixabay", function (req, res) {
    let placename = req.body.placename
    let url = `https://pixabay.com/api/?key=${process.env.PIXABAY_KEY}&q=${placename}&image_type=photo&orientation=horizontal&per_page=3`

    console.log(url)
    axios.get(url)
    .then(function(response) {
        console.log(response.data)
        res.send(response.data)
    })
    .catch(function (error) {
        console.log(error); // handle error
    })
})

app.get("/", function (req, res) {
    res.sendFile("dist/index.html")
});

module.exports = app;