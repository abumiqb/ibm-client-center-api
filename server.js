var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

// create express app
var app = express();


app.use(cors());
app.options('*', cors());
app.use(function(req, res, next) {
    res.header("X-Total-Count", "30");
    res.header("Access-Control-Expose-Headers", "X-Total-Count");
    next();
});

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// Configuring the database
var dbConfig = require('./config/database.config.js');
var mongoose = require('mongoose');


mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, {
    //useMongoClient: true
});
//
mongoose.connection.on('error', function() {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});

mongoose.connection.once('open', function() {
    console.log("Successfully connected to the database");
});


// define a simple route
app.get('/', function(req, res){
    res.json({"melding": "The World Is Yours"});
});


// Require routes for rom and bookings
require('./app/routes/rom.routes.js') (app);
require('./app/routes/booking.routes.js') (app);


const port = process.env.PORT || 3001;
app.listen(port, function () {
    console.log('The World Is Yours on port ' + port)
});

//kjk