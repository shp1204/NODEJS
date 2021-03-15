var express = require('express')
var router = express.Router() // express 중 Router 메소드만 호출 => return : Router
var template = require('../lib/template.js');
var dbconn = require('../lib/connection.js');


router.get('', function(request, response){
    var title = '회원가입';
    var html = template.JOIN(title);
    response.send(html);
});


router.post('/process', function(request, response){

    var post = request.body;
    var sql = 'INSERT INTO tb_user(user_name, user_department, user_id, user_pw, user_email) VALUES(?,?,?,?,?)';
    var params = [post.name, post.department, post.id, post.pw, post.mail];

    dbconn.INSERT(sql, params);

    response.redirect(`/`);

});

module.exports = router;