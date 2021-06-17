var express = require('express');
var router = express.Router();
const User = require("../models/User");
var mongoose = require('mongoose');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post('/', function(req, res, next) {
  
  username = req.body.username;
  password = req.body.password;
  console.log(req.body.username)
  console.log(req.body.password)
  // verify username and password from the DB
  if(password === "123"){
  	res.send({
    	admin: "123"
  	});
  	/*User.find({"username":username},function(error,doc1){
  		console.log(doc1)
  		userNumber = doc1[0].phonenumber;
   		
   });*/
  		
  }
});

module.exports = router;
