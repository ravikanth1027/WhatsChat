var express = require('express');
var router = express.Router();
const faker = require('faker')
var telnyx = require('telnyx')('KEY0179A9DC158E10BE3F59F5ABF06F2CB9_ef4AMhbmQtdkCfzuZ356Ex');
const Message = require("../models/message");
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post('/', function(req, res, next) {
  console.log(req.body)
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
