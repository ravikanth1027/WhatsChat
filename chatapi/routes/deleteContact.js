const express = require("express");
const mongoose = require('mongoose');
const Messages = require("../models/message");
const User = require("../models/User");
const router = express.Router();
const faker = require('faker')


router.post("/", (req, res) =>{
    console.log("***********")
    contactToDel = req.body.contact
    mynumber  = req.body.mynumber
    User.find({'phonenumber':mynumber},function(error,doc){
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
            const index = exist_contacts.findIndex(x => x.number === contactToDel.number);
            if (index !== undefined) exist_contacts.splice(index, 1);
            console.log("After removal:", exist_contacts);
            User.update({'phonenumber':req.body.mynumber},{$set: {"contacts": exist_contacts}},function(err,result){
                var myquery =  {$or:[{$and : [ {"from" : contactToDel.number}, {"to" : mynumber}]},{$and:[{"from" : mynumber},{"to" : contactToDel.number}]}]};
                Messages.deleteMany(myquery, function(err, obj) {
              if (err) throw err;
                  console.log("1 document deleted");
                 });
                res.send(
                  (err === null) ? {msg: "item removed from database"} : {msg: err}
                    );
                });
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
