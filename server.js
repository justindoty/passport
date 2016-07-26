var express = require('express');
var index = require('./routes/index.js');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');


var app = express();


app.use(bodyParser.json());
app.use(express.static('public'));

app.use('/', index);




var server = app.listen(3000, function(){
  var port = server.address().port;
  console.log('Address', server.address());
  console.log("Listening on port ", port);
});
