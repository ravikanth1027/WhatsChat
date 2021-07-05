var express = require('express');
var router = express.Router();
const faker = require('faker')
const Message = require("../models/message");
const User = require("../models/User");
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const async = require('async')

router.get("/", (req, res) =>{
   //console.log(req.query.number)
    var mynumber = req.query.number
    mynumber = '+'+mynumber.trim();
    console.log("req.query.number: ",mynumber.trim())
    var data = {}
    var list_messages = []
    if(mynumber !== 'undefined'){
     User.find({"phonenumber":mynumber},function(error,doc1){
        contactsData = doc1[0].contacts
        var tmpContacts = new Map();
        Message.find({"to":mynumber}, (err, results) => {         
        async.forEach(results,(element, callback) => {
          //console.log(element.from)
          var found = contactsData.filter(function(item) { return item.number === element.from; });
          if(found.length == 0){
          //$and:[{"from" : mynumber},{"to" : element.number}]
            if(tmpContacts.has(element.from)){
              tmpContacts.get(element.from).push(element)
            }else{
              var tmpMsgList = []
              tmpMsgList.push(element)
              tmpContacts.set(element.from, tmpMsgList)               
          }
          }
        });
        Message.find({"from":mynumber}, (err, results) => {         
        async.forEach(results,(element, callback) => {
          var found = contactsData.filter(function(item) { return item.number === element.to; });
          if(found.length == 0){
          //$and:[{"from" : mynumber},{"to" : element.number}]
            if(tmpContacts.has(element.to)){
              tmpContacts.get(element.to).push(element)
            }else{
              var tmpMsgList = []
              tmpMsgList.push(element)
              tmpContacts.set(element.from, tmpMsgList)               
          }
          }
        });
        for (const [key, value] of tmpContacts.entries()) {
         var x = {
              id: "key"+key,
              name: key,
              number: key,
              avatar: null
          }
        var tmp = {
          contact : x,
          messages : value
        }
        list_messages.push(tmp)
      }
      if(contactsData.length == 0){
        return res.status(200).send(list_messages);
      }else{
          async.forEach(contactsData,(element, callback) => {
          //({$or:[{$and : [ {"from" : element.number}, {"to" : mynumber}]},{$and:[{"from" : mynumber},{"to" : element.number}]}]})
              Message.find({$or:[{$and : [ {"from" : element.number}, {"to" : mynumber}]},{$and:[{"from" : mynumber},{"to" : element.number}]}]}, (err, results) => {
                //console.log(results)
                if (err) callback(err)
                if(results.length == 0){
                    var tmp = {
                      contact : element,
                      messages : []
                    }
                    list_messages.push(tmp)
                    callback(null)
                }
                if(results.length) {
                    var tmp = {
                      contact : element,
                      messages : results
                    }
                    list_messages.push(tmp)
                    callback(null)
              }
          });
          }, (err) => {
                console.log("Hello0000000000"+list_messages)
                if(err){
                  console.log(err)
                }else{
                    return res.status(200).send(list_messages);
                }
            });
      }
     });
    });
    });
   }
else{
    return res.status(200).send([]);
  }
});


router.post("/", (req, res) =>{
  console.log(req.body.text)
    var message = new Message(req.body);
    message["id"] = faker.random.uuid()
    message.save()
    .then(item => {
        res.send("item saved to database");})
 .catch(err => {
  console.log(err)
 res.status(400).send("unable to save to database");
 });
});

module.exports = router;