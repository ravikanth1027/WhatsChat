const express = require("express");
const mongoose = require('mongoose');
const messages = require("../models/message");
const User = require("../models/User");
const router = express.Router();
const faker = require('faker')

router.post("/", (req, res) =>{
    console.log("Add Contact")
    name = req.body.name
    number = req.body.number
    avatar = req.body.avatar
    id = faker.random.uuid()
    console.log(req.body)
    User.find({'phonenumber':req.body.phonenumber},function(error,doc){
        if(doc.length == 0){
            exist_contacts = [];
            /*exist_contacts.push({id, name, number, avatar});*/
            /*console.log("Returning frmo heree12131");
            return res.status(200).json({
            data:doc.contacts
            });*/

        }else{
            if(doc[0].contacts.length == 0){
                exist_contacts = [];
            }else{
                exist_contacts = doc[0].contacts;
            }
            var found = exist_contacts.filter(function(item) { return item.number === number; });
            if(found.length == 0){
                exist_contacts.push({id, name, number, avatar});
                User.update({'phonenumber':req.body.phonenumber},{$set: {"contacts": exist_contacts}},function(err,result){
                res.send(
                  (err === null) ? {msg: "item saved to database"} : {msg: err}
                    );
                });    
            }else{
                res.send("Contact already exists")
            }
            
            
        }
    });
    /*myData.save()
    .then(item => {
        res.send("item saved to database");})
 .catch(err => {
 res.status(400).send("unable to save to database");
 });*/
});

module.exports = router;
