var express = require('express');
var router = express.Router();
var telnyx = require('telnyx')('KEY0179A9DC158E10BE3F59F5ABF06F2CB9_ef4AMhbmQtdkCfzuZ356Ex');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post('/', function(req, res, next) {
  msg = req.body;
  console.log("********")
  console.log(msg)
  console.log("********")
  /*telnyx.messages.create(
  {
    'from': '+17342344988', // Your Telnyx number
    'to': '+17342344999',
    'text': "TEST for RINKU"
  },
  function(err, response) {
    // asynchronously called
    res.send(response);
  }
  );*/
  telnyx.messages.create(
  msg,
  function(err, response) {
    // asynchronously called
    res.send(response);
  }
  );
});

module.exports = router;
