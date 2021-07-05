var express = require('express');
var router = express.Router();
const faker = require('faker')
var telnyx = require('telnyx')('KEY0179A9DC158E10BE3F59F5ABF06F2CB9_ef4AMhbmQtdkCfzuZ356Ex');
const Message = require("../models/message");
const request = require('request');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post('/', function(req, res, next) {
  console.log("receive api called");
  var from = req.body.from;
  var to = req.body.to;
  var text = req.body.text;
  console.log("#####")
   var mtxt = {
        "from": from,
        "to": to,
        "text": text
                };
    console.log(mtxt)
   var message = new Message(mtxt);
    message["id"] = faker.random.uuid()
    message.save()
    .then(item => {
        bodyParms =  "phonenumber="+to+"&from="+from+"&message="+text+"&url=http://localhost:3000/dashboard&title=Voipsms Chat"
        request.post({
                headers: {'content-type' : 'application/x-www-form-urlencoded'},
                url:     'http://localhost:4000/push',
                body : bodyParms
            }, 
            function(error, response, body){
                if(error){
                   console.log(`pushtoken over http api Error:  ${error}`);
                }else{
                    //winston.info(`pushtoken over http api respose:  ${body}`);
                    
                  if(body=='Your message was sent.'){
                      res.sendStatus(200);
                    }else{
                        res.status(400).send(body);
                    }

                }
            }
    );
    //res.send("item saved to database");
  })
 .catch(err => {
  console.log(err)
 //res.status(400).send("unable to save to database");
 res.status(400).send(err);
 });
});

module.exports = router;
