var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');
var Users = require('../models/user');


router.get('/', function(req, res){
  res.sendFile(path.join(__dirname, '../public/views/register.html'));
});

//update the post. req.body...
router.post('/', function(req, res){
  Users.create(req.body.username, req.body.password, function(err){
    if(err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      console.log('User Registered');
      res.redirect('/');
    }
  });
});

module.exports = router;
