var express = require('express')
var router = express.Router() // express 중 Router 메소드만 호출 => return : Router
var path = require('path');
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
        console.log(obj[keys[i]]);
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
    var sql = 'SELECT form_id, form_apply_date, form_user_name, form_lec_title, form_appr_0, form_appr_1, form_appr_2, form_appr_3, appr_status_0, appr_status_1, appr_status_2, appr_status_3 FROM tb_application_form'
    
    dbconn.SHOW2(sql, response)
    // response.send('결재 화면');
});

router.post('/approval/process', function(request, response){

    /*
        넘겨받은 selected 값 확인 후 변환
        해당 신청서 정보
        selected 값 정보
    */

    var appr_length = request.body.approval
    console.log(appr_length); 
    // [1, 1, 1, 1]
    // option을 default로 selected 해둬야 -> 값 넘겨받아서 업데이트 할때 순서대로 가능함
    //console.log(request);
    


    // const obj = JSON.parse(JSON.stringify(post)); 
    // var keys = Object.keys(obj);
    // for (var i=0; i < keys.length; i++){
    //     console.log(obj[keys[i]]);
    // };


    // var sql = 'ALTER TABLE tb_application_form MODIFY '

    response.send('결재 중~');
});

router.get('/approval/:pageId', function(request, response){

    var sql = 'SELECT form_id, form_apply_date, form_user_name, form_lec_title, form_appr_0, form_appr_1, form_appr_2, form_appr_3, appr_status_0, appr_status_1, appr_status_2, appr_status_3 FROM tb_application_form WHERE form_id = ?'
    var pageId = path.parse(request.params.pageId).base;
    
    dbconn.SHOW3(pageId, sql, response)
    // response.send("결재중")
})

router.get('/approval/update/:pageId', function(request, response){
    response.send("업데이트중")
})

module.exports = router;