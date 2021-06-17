var express = require('express');
var router = express.Router();
const faker = require('faker')
const Message = require("../models/message");
const User = require("../models/User");
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const async = require('async')

router.get("/", (req, res) =>{
    var mynumber = req.query.number
    console.log("req.query.number: ",typeof req.query.number)
    var data = {}
    var list_messages = []
    if(mynumber !== 'undefined'){
     User.find({"phonenumber":mynumber},function(error,doc1){
        
        contactsData = doc1[0].contacts
        let notuser = [];
        
        async.forEach(contactsData,(element, callback) => {
          //({$or:[{$and : [ {"from" : element.number}, {"to" : mynumber}]},{$and:[{"from" : mynumber},{"to" : element.number}]}]})
          Message.find({$or:[{$and : [ {"from" : element.number}, {"to" : mynumber}]},{$and:[{"from" : mynumber},{"to" : element.number}]}]}, (err, results) => {
            console.log(results)
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
     })
      }, (err) => {
            console.log("Hello0000000000"+list_messages)
            if(err){
            console.log(err)
            }else{
              return res.status(200).send(list_messages);
            }
      });

      });
   }
else{
    return res.status(200).send([]);
}
   });

router.post("/", (req, res) =>{
  console.log(req.body.msg)
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
