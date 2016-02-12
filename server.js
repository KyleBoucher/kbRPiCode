var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var path = require('path');
var app = express();

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use('/views', express.static(path.join(__dirname, 'views')));
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/python', express.static(path.join(__dirname, 'python')));

app.use(morgan('dev'));
app.use(bodyParser());
app.use(methodOverride());


// Database
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/weather', function(err) {
    if(err) { console.log('mongodb connect error', err); }
    else { console.log('mongodb connect success'); }
});


// main route
var router = express.Router();
app.use('/', router);
router.get('/', function(req, res) {
    res.render('index');
});

// weather route
var weather = require('./js/routes/weather');
app.use('/weather', weather);


// Start
app.listen(4567);
console.log("Weather Station server listening on port 4567");
