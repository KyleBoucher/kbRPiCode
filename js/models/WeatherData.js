var mongoose = require('mongoose');

var WeatherData = new mongoose.Schema({
    timeStamp: String,
    lightLevel: Number,
    temperature: Number,
    pressure: Number,
    humidity: Number,
    windSpeed: Number,
    windDirection: String
});

module.exports = mongoose.model('WeatherData', WeatherData);