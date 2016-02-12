var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var WeatherData = require('../models/WeatherData.js');

// GET: Index
router.get('/', function(req, res, next) {
    WeatherData.find(function(err, wData) {
        if(err) {return next(err);}
        res.json(wData);
    });
});

router.post('/', function(req, res, next) {
    WeatherData.create(req.body, function(err, post) {
        if(err) { return next(err);}
        res.json(post);
    });
});


module.exports = router;