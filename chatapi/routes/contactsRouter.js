const express = require("express");
const mongoose = require('mongoose');

const User = require("../models/User");
const router = express.Router();
var mongo = require('mongodb');
/*const Contacts = require("../models/User");*/


router.get("/", (req, res) =>{
    User.find({},function(error,doc1){
        res.setHeader( 'Access-Control-Expose-Headers', 'Content-Range')
        res.setHeader('Content-Range','bytes : 0-256/*')
        /*console.log(doc1)*/
        var data = []
        for (var i = 0; i < doc1.length; i++) {
            var x = {
                "id":doc1[i].id,
                "username":doc1[i].username,
                "phonenumber":doc1[i].phonenumber,
                "email" : doc1[i].email,
                "company" : doc1[i].company
            }
            data.push(x)
        }
        return res.status(200).send(data);
    });
	
});

router.get('/:id', function(req, res) {
    
    console.log("in new get", req.params.id)
    var o_id = new mongo.ObjectID(req.params.id);
    User.find({'_id':o_id}, function(error, doc1){
        console.log("Helo", doc1);
    });
});

router.put('/:id', function (req, res) {
    /*var newvalues = new User(req.body);*/
    var o_id = new mongo.ObjectID(req.params.id);
    var myquery = {"_id":o_id}
    var newvalues = { $set: { "username": req.body.username, "email": req.body.email, "phonenumber": req.body.phonenumber, "company": req.body.company} };
    User.updateOne(myquery, newvalues, function(err, doc1){
        if (err) throw err;
        console.log("1 document updated", doc1);
        res.status(200).send("database updated");
    });
});

router.delete('/:id', function (req, res) {
    var o_id = new mongo.ObjectID(req.params.id);
    var myquery = {"_id":o_id}

    User.deleteMany(myquery, function(err, doc1){
        if (err) throw err;
        console.log("found 1 ", doc1);
        res.status(200).send("database updated");
});
});

router.post("/", (req, res) =>{
    var myData = new User(req.body);
    console.log(myData)
    myData.phonenumber = "+"+myData.phonenumber
    myData.save()
    .then(item => {
        /*console.log(item.id)*/
        /*res.send("item saved to database");})*/
        res.status(200).send("User Added Successfully");
    }).catch(err => {
    console.log(err)
 res.status(400).send("unable to save to database");
 });
});

module.exports = router;
