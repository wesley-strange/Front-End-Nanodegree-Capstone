const dotenv = require("dotenv");
dotenv.config();

var path = require("path");

const express = require("express");
const app = express();
app.use(express.static("dist"));
app.use(express.json());

const cors = require("cors");
app.use(cors());

console.log(__dirname);

app.get("/", function (req, res) {
    res.sendFile("dist/index.html")
});

module.exports = app;