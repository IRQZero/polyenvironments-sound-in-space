var express = require('express');
var router = express.Router();
var error = require('../error/error.hbs');
console.log(error);
router.get('/', function(req, res) {

  res.render('index', {
    message: 'make sounds come out'
  });
});

module.exports = router;
