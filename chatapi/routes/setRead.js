var express = require('express');
var router = express.Router();
const faker = require('faker')
const Message = require("../models/message");
const User = require("../models/User");
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const async = require('async')

router.get("/", (req, res) =>{
  mynumber = req.query.number.trim()
  number = req.query.contact.trim()
  //{"date":{ $lt: new Date()}}
  console.log(mynumber, number)
  Message.updateMany({"from" : "+"+number, "to" : "+"+mynumber}, { $set: { "read": true} }, function(err, doc1){
        if (err) throw err;
        console.log("1 document updated", doc1);
        res.status(200).send("database updated");
    });
});

module.exports = router;