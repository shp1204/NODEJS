var express = require('express')
var router = express.Router()
var template = require('../lib/template.js');

router.get('/', function(request, response) { 
    var title = 'Welcome';
    var description = "다임 인재개발원에 오신 것을 환영합니다! : )";
    var html = template.MAIN(title,
      `<h3>${description}</h3>
      <ul><a href = "/login">login</a></ul>
        <ul><a href = "/join">join</a></ul>`
    ); 
    response.send(html);
  });

module.exports = router;


