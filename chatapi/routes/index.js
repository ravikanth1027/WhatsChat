var express = require('express');
var router = express.Router();
const User = require("../models/User");
var mongoose = require('mongoose');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post('/', function(req, res, next) {
  req.body;
  username = req.body.username;
  password = req.body.password;

  if(username === "admin"){
  	 if(password === "123"){
  	 		res.send({
   				 	admin: "admin"
  			});
  	 }

  }else{
  	User.find({$and:[{"username" : username},{"password" : password}]},function(error,doc1){
  		if(doc1.length != 0){
  			userNumber = doc1[0].phonenumber;
  			res.send({
   				 	token: userNumber+","+username
  			});
  		
  		}else{
  			res.send({});
  		}
  	});
  }		
   });



module.exports = router;
