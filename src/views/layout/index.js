var template = require('./templates/sample.hbs');
var $ = require('jquery');

$('#page').html(template({body:"bottom text"}));
