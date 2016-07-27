var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');
var mongoose = require('mongoose');
var User = require('./models/user');
var register = require('./routes/register.js');
var login = require('./routes/login.js');
var path = require('path');
var app = express();

var session = require('express-session');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.static('public'));
app.use(passport.initialize());
app.use(passport.session());

app.use('/register', register);
app.use('/login', login);
app.use('/', login);



app.use(session({
  secret: 'secret',
  key: 'user',
  resave: true,
  saveUninitialized: false,
  cookie: {maxAge: 600000, secure: false}

}));

var localStrategy = require('passport-local').Strategy;



passport.use('local', new localStrategy({
  passReqToCallback: true,
  usernameField: 'username'
},
function(req, username, password, done){
  User.findOne({ username: username}, function(err,user){
    if(err) {
      console.log("find error");
      throw err
    };
    if (!user) {
      return done(null, false, {message: 'Incorrect username and password.'});
    }

    user.comparePassword(password, function(err, isMatch){
      if(err) {
        console.log("compare err");
        throw err;
      }

      if (isMatch) {
        return done(null, user);
      } else {
        done(null, false, {message: 'Incorrect username and password'});
      }
    });
  });
})
);

passport.serializeUser(function(id, done){
  User.findById(id, function(err, user){
    if(err) {
      return done(err);
    }
    done(null,user);
  });
});





// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded());
// app.use(express.static('public'));



var mongoURI = "mongodb://localhost:27017/prime_example_passport";
var MongoDB = mongoose.connect(mongoURI).connection;

MongoDB.on('error', function (err){
  console.log('mongodb connection error', err);
});

MongoDB.once('open', function(){
  console.log('MongoDB connection open');
});




var server = app.listen(3000, function(){
  var port = server.address().port;
  console.log('Address', server.address());
  console.log("Listening on port ", port);
});
