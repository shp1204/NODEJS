var express = require('express')
var router = express.Router() // express 중 Router 메소드만 호출 => return : Router
var template = require('../lib/template.js');

router.get('/', function(request, response) { 
    var title = 'Welcome';
    var description = 'Hello, Node.js';
    var list = template.list(request.list);
    var html = template.HTML(title, list,
      `<h2>${title}</h2>${description}`,
      `<a href="/topic/create">create</a>`
    ); 
    response.send(html);
  });

module.exports = router;