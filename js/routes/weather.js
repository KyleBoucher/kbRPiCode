var express = require('express');
var router = express.Router();
var moment = require('moment');
var mongoose = require('mongoose');
var WeatherData = require('../models/WeatherData.js');

// GET: Index
router.get('/', function(req, res, next) {
    
    //WeatherData.remove({}, function(err) {});
    var history = 0;
    
    var date = moment.utc();
    var todayString = date.day(date.day()-i).format("YYYY-MM-DD");
    var search = todayString;
    for(var i = 1; i <= history; ++i) {
        var newDate = date.clone();
        var otherString = newDate.day(newDate.day()-i).format("YYYY-MM-DD");
        search = otherString + "|" + search;
    }
    
    console.log(search);
    
    WeatherData.find({
        timeStamp: new RegExp("^(" + search + ")", "i")
    })
//    .$where(function() {
//        return false;
//    })
    .exec(function(err, wData) {
        if(err) {return next(err);}
        res.json(wData);
        //console.log(wData.length);
    });
});

router.post('/', function(req, res, next) {
    WeatherData.create(req.body, function(err, post) {
        if(err) { return next(err);}
        res.json(post);
    });
});


module.exports = router;