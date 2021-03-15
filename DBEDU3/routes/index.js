var express = require('express')
var router = express.Router()
var template = require('../lib/template.js');
const multer = require('multer');
const upload = multer({dest: '../lib/'})


router.get('/', function(request, response) { 
    var title = 'Welcome';
    var description = "다임 인재개발원에 오신 것을 환영합니다! : )";
    var html = template.MAIN(title,
      `<h5 "text-center">${description}</h5>
      <br>
      <ul class = "text-center"><a href = "/login">로그인</a></ul>
      <ul class = "text-center"><a href = "/join">회원가입</a></ul>`
    ); 
    response.send(html);
  });

module.exports = router;


