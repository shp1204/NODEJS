var express = require('express')
var router = express.Router()
var template = require('../lib/template.js');

router.get('/', function(request, response) { 
    var title = 'Welcome';
    var description = "환영합니다! : )";
    var html = template.MAIN(title,
      `<h2>${description}</h2>
      <ul><a href = "/login">login</a></ul>
        <ul><a href = "/join">join</a></ul>`
    ); 
    response.send(html);
  });

module.exports = router;


