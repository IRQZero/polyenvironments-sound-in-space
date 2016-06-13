var fs = require('fs');
var path = require('path');

app.get('/sound/:sid', function(req, res){
  res.set({'Content-Type': 'audio/mpeg'});
  var readStream = fs.createReadStream(path.join(__dirname, req.params.sId);
  readStream.pipe(res);
})
