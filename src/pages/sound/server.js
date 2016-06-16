var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');

router.get('/sound/:sid', function(req, res){
  res.set({'Content-Type': 'audio/mpeg'});
  var readStream = fs.createReadStream(path.join(__dirname, req.params.sId));
  readStream.pipe(res);
});

module.exports = router;
