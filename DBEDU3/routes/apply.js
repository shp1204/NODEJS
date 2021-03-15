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
    
    var sql = 'SELECT form_id, form_apply_date, form_user_name, form_lec_title FROM tb_application_form';
    dbconn.SHOW(sql, response);
});

router.get('/list/:pageId', function(request, response){
    
    var pageId = path.parse(request.params.pageId).base;
    var sql = 'SELECT * FROM tb_application_form WHERE form_id = ' + pageId;

    dbconn.SHOW_CONTENT(sql, response);
    //response.send(pageId);
});



router.get('/approval', function(request, response){
    var sql = 'SELECT form_id, form_apply_date, form_user_name, form_lec_title, form_appr_0, form_appr_1, form_appr_2, form_appr_3, appr_status_0, appr_status_1, appr_status_2, appr_status_3 FROM tb_application_form'
    
    dbconn.SHOW2(sql, response)
    
});

router.get('/approval/content/:pageId', function(request, response){
    var pageId = path.parse(request.params.pageId).base;
    var sql = 'SELECT * FROM tb_application_form WHERE form_id = ' + pageId;

    dbconn.SHOW_CONTENT2(sql, response);
    
});

router.get('/approval/:pageId', function(request, response){

    var sql = 'SELECT form_id, form_apply_date, form_user_name, form_lec_title, form_appr_0, form_appr_1, form_appr_2, form_appr_3, appr_status_0, appr_status_1, appr_status_2, appr_status_3 FROM tb_application_form WHERE form_id = ?'

    var pageId = path.parse(request.params.pageId).base;
    
    dbconn.SHOW3(pageId, sql, response)
   
})

router.get('/approval/process/:pageId', function(request, response){


    var pageId = path.parse(request.params.pageId).base;
    var params= request.query.approval;
    var sql = 'UPDATE tb_application_form SET appr_status_0 = ' + params[0] + ', appr_status_1 = ' + params[1] + ', appr_status_2 = ' + params[2] +', appr_status_3 = ' + params[3]
    + ' WHERE form_id = ' + pageId;

    dbconn.UPDATE(sql, response);
   
});

router.get('/approval/update/:pageId', function(request, response){
    response.send("업데이트중")
})

module.exports = router;