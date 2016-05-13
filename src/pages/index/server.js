var express = require('express');
var router = express.Router();
router.get('/', function(req, res) {
  console.log(res.locals);
  res.render('index', {
    message: 'make sounds come out'
  });
});

module.exports = router;
