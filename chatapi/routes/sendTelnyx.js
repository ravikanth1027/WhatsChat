var express = require('express');
var router = express.Router();
const faker = require('faker')
var telnyx = require('telnyx')('KEY0179A9DC158E10BE3F59F5ABF06F2CB9_ef4AMhbmQtdkCfzuZ356Ex');
/* GET home page. */
const Message = require("../models/message");
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', function(req, res, next) {
  msg = req.body;
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
    message["date"] = new Date()
    //console.log("^^^^^^^^^",message["date"])
    telnyx.messages.create(mtxt,function(err, response) { // asynchronously called
          res.send(response);
        });
   /* message.save()
    .then(item => {
	
       res.send(item);
})
 .catch(err => {
  console.log(err)
      res.status(400).send("unable to save to database");
    });*/
  //res.send(response);
});

module.exports = router;
