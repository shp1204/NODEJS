var express = require('express')
var router = express.Router() // express 중 Router 메소드만 호출 => return : Router
var template = require('../lib/template.js');
var dbconn = require('../lib/connection.js');


router.get('', function(request, response){
    var title = '교육 신청서';
    var html = template.APPLY(title);
    response.send(html);
});

router.post('/process', function(request, response){

    var post = request.body;
    const obj = JSON.parse(JSON.stringify(post)); 
    var keys = Object.keys(obj);
    var sql = 'INSERT INTO tb_application_form(form_apply_date, form_user_name, form_lec_title, form_lec_start, form_lec_end, form_lec_price, form_lec_content, form_purpose, form_lec_onoff, form_lec_org, form_lec_link,form_appr_0, form_appr_1, form_appr_2, form_appr_3) VALUES(?)';

    var key_list = [];
    for (var i=0; i < keys.length; i++){
        key_list.push(obj[keys[i]]);
    };    

    var params = [key_list];
    dbconn.INSERT(sql, params);
    response.redirect(`/apply/list`);
});


router.get('/list', function(request, response){
    //response.send('교육 신청 목록');
    var sql = 'SELECT form_id, form_apply_date, form_user_name, form_lec_title FROM tb_application_form';
    dbconn.SHOW(sql, response);
});

router.get('/approval', function(request, response){
    response.send('결재 화면');
});

router.get('/approval/process', function(request, response){
    response.send('결재 중~');
});

module.exports = router;