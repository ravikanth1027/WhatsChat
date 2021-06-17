const express = require("express");
const mongoose = require('mongoose');

const User = require("../models/User");
const router = express.Router();
/*const Contacts = require("../models/User");*/


router.get("/", (req, res) =>{
    /*var mynumber = req.query.number*/
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
        return res.status(200).send(           
                data
              );
    });
	
});

router.post("/", (req, res) =>{
    var myData = new User(req.body);
    console.log(myData)
    myData.save()
    .then(item => {
        console.log(item.id)
        /*res.send("item saved to database");})*/
        res.send({"id":item.id});})
 .catch(err => {
 res.status(400).send("unable to save to database");
 });
});

	/*let username = req.query.username;
   	let password =  req.query.password;
   	let last_id = req.query.last_id;
    let last_sent_id = req.query.last_sent_id;
    let device = req.query.device;

    if(!username){
       return res.status(406).json({              
           message:"username is required."
       });
     }
     //console.log("*****************************"+username)
    SendMessages.find({"login":username}).sort( { _id : -1 } ).limit(1).exec(function(err, doc){
    	if(err){
    		winston.error(`Save error ${err}`);
    	    return res.status(406).json({
            message:"VOIP Database Error."
         });
    	}
    	if(doc.length==0){
            console.log("Returning frmo heree");
            return res.status(200).json({
                data:[]
            });
        }else if(doc[0].sender == "%"){
            //winston.info(`source_number is empty ${doc[0].source_number}`);

            return res.status(200).json({
                data:[]
            });
        }

    winston.info("SourceNumber: ", doc[0].sender);
    console.log("SourceNumber----------: ",doc[0].sender)
    FetchMessages.find({'to':doc[0].sender},function(error,doc1){ // Needs to be changed
     	if(error){
     		 winston.error(`Save error ${error}`);
             return res.status(406).json({
             message:"VOIP Database Error."
            });
         
         }
         
        if(doc1.length == 0){

            //winston.info(`destination number not match with source number`);
            console.log("Returning frmo heree12131");
            return res.status(200).json({
            data:[]
            });

        }else{
            //console.log(doc1);
         	 var unread_smss = [];
         	 for(var i=0; i<doc1.length; i++){
         	 	let element = {};
                console.log("**********",doc1[i].read)
                if(!doc1[i].read){
                //console.log(doc1);
         	 	element.sms_id = doc1[i]._id
                element.sending_date = doc1[i].date;
         	 	element.sender = doc1[i].source
                element.sms_text = doc1[i].message

         	 	unread_smss.push(element);
            }
             //New code
                var myquery = { id: doc1[i]._id };
                console.log(myquery)
                //var myquery = { $and: [ { id: doc1[i]._id }, { read: { $exists: false } } ] };
                var newvalues = { "read": true};
            FetchMessages.findByIdAndUpdate(doc1[i]._id, { "read": true}, function(err, res) {
                    console.log(res)
                    if (err)
                        console.log(err);
                    
                    
                });
                //New Code
              }
              
             return res.status(200).json({            
                date: new Date(),
                unread_smss:unread_smss
       		  });  
         	}
        })
    });
*/


module.exports = router;
