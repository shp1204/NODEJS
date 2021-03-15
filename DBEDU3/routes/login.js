var express = require('express')
var router = express.Router() // express 중 Router 메소드만 호출 => return : Router
var template = require('../lib/template.js');
var dbconn = require('../lib/connection.js');


router.get('', function(request, response){
    var title = '로그인';
    var html = template.LOGIN(title);
    response.send(html);
});


router.post('/process',function(request, response){

    var post = request.body;
    var sql =  'SELECT user_id, user_pw FROM tb_user WHERE user_id = ?';
    var params = [post.id];
    dbconn.CHECK(sql, params, post, response)    
    
});

router.get('/success', function(request, response){
    console.log(request)
    var title = "환영합니다";
    var html = template.MAIN(title, 
        `
        <ul><a href = "/apply">교육 신청서 작성하기</a></ul>
        <ul><a href = "/apply/list">교육 신청 목록 확인하기</a></ul>
        <ul><a href = "/apply/approval"> 결재하기 </a></ul>
        `
    );
    response.send(html);   
})

module.exports = router;