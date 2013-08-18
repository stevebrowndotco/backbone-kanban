var express = require('express'),
    mongoq = require('mongoq');

//Initialize Database

var db = mongoq('mongodb://localhost:27017/awesome');

//The App

var app = express();

app.use(express.bodyParser()); // Automatically parse JSON in POST requests
app.use(express.static(__dirname + '/public')); //public folder
app.use(express.errorHandler({dumpExceptions: true, showStack: true})); // Dump errors

app.post('/', function(req, res) {
  console.log(res);
});

app.listen(8000);