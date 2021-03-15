const { response } = require('express');
const { xssFilter } = require('helmet');
const { default: strictTransportSecurity } = require('helmet/dist/middlewares/strict-transport-security');

var dbconn = {
    // JOIN 
    INSERT : function(sqlquery, parameters){
        var mysql = require('mysql');
        const vals = require('../info/consts_daim.js');

        var con = mysql.createConnection({
            host: vals.DBHost, port:vals.DBPort,
            user: vals.DBUser, password: vals.DBPass,
            connectionLimit: 5, database: vals.DB
        });

        // 연결되었는지 확인
        con.connect(function(err){
            if (err) throw err;
            console.log("You are connected");
        });

        // 수행하고 싶은 작업(sql문) 
        var sql = sqlquery;
        var params = parameters;
        con.query(sql, params, function(err, rows, fields){
            if(err){
                console.log(err);
            } else{
                console.log(rows.name);
            }
        });

        con.end();
    },

    // LOGIN CHECK
    CHECK : function(sqlquery, parameters, post_value, response){
        var mysql = require('mysql');
        const vals = require('../info/consts_daim.js');

        var con = mysql.createConnection({
            host: vals.DBHost, port:vals.DBPort,
            user: vals.DBUser, password: vals.DBPass,
            connectionLimit: 5, database: vals.DB
        });

        // 연결되었는지 확인
        con.connect(function(err){
            if (err) throw err;
            console.log("You are connected");
        });

        // 수행하고 싶은 작업(sql문) 
        var sql = sqlquery;
        var params = parameters;
        con.query(sql, params,function(error, result){
            try{
                // 사용자가 입력한 id
                var input_id = post_value.id;
                var input_pw = post_value.pw;

                var valid_id = result[0].user_id;
                var valid_pw = result[0].user_pw;
                console.log(input_id, valid_id, input_pw, valid_pw)

                if(input_id === valid_id){
                    if(input_pw === valid_pw){
                        console.log("로그인 성공!");
                        con.end();
                        response.redirect(`/login/success`);
                    }else{
                        console.log("비밀번호를 확인하세요");
                        con.end();
                        response.redirect(`/login`);
                    }
                }
            }catch(error){
                console.log("존재하지 않는 회원입니다.");
                con.end();
                response.redirect(`/join`);
            }
        });
        
    },   
    
    // APPLY LIST SELECT
    // 여기에서 조회해서
    // html = template.SELECT 여기에서 만들어줌
    // response(html)
    SHOW : function(sqlquery, response){
        var mysql = require('mysql');
        const vals = require('../info/consts_daim.js');

        var con = mysql.createConnection({
            host: vals.DBHost, port:vals.DBPort,
            user: vals.DBUser, password: vals.DBPass,
            connectionLimit: 5, database: vals.DB
        });

        // 연결되었는지 확인
        con.connect(function(err){
            if (err) throw err;
            console.log("You are connected");
        });

        // 수행하고 싶은 작업(sql문) 
        var sql = sqlquery;
        con.query(sql, function(error, result){

            if(error){
                console.log(err);
                
            } else{
                var tmp_body = '';
                for (var i = 0; i < result.length; i++){
                    
                    var apply_date = new Date(result[i].form_apply_date).toLocaleDateString();
                                        
                    var user_name = result[i].form_user_name;
                    var lec_title = result[i].form_lec_title;
                    var form_id = result[i].form_id
                
                    tmp_body = tmp_body + `<tr><td>` + (i + 1) + `</td>`;
                    tmp_body = tmp_body + `<td>` + apply_date + `</td>`
                    tmp_body = tmp_body + `<td>` + user_name + `</td>`
                    tmp_body = tmp_body + `<td><a href=/apply/list/${form_id}>` + lec_title + `</td></tr>`
    
                }
                var template = require('../lib/template.js');
                var html = template.APPLY_LIST(tmp_body);
                
                response.send(html);
            }
        });           
        con.end();
    },
    
    SHOW2 : function(sqlquery, response){
        var mysql = require('mysql');
        const vals = require('../info/consts_daim.js');

        var con = mysql.createConnection({
            host: vals.DBHost, port:vals.DBPort,
            user: vals.DBUser, password: vals.DBPass,
            connectionLimit: 5, database: vals.DB
        });

        // 연결되었는지 확인
        con.connect(function(err){
            if (err) throw err;
            console.log("You are connected");
        });

        // 수행하고 싶은 작업(sql문) 
        var sql = sqlquery;
        con.query(sql, function(error, result){

            if(error){
                console.log(err);
                
            } else{
                var tmp_body = '';
                for (var i = 0; i < result.length; i++){
                    var apply_date = new Date(result[i].form_apply_date).toLocaleDateString();
                    
                    var form_id = result[i].form_id

                    var user_name = result[i].form_user_name;
                    var lec_title = result[i].form_lec_title;

                    var stat_0 = result[i].appr_status_0;
                    var stat_1 = result[i].appr_status_1;
                    var stat_2 = result[i].appr_status_2;
                    var stat_3 = result[i].appr_status_3;

                    var final_stat = ``
                    var stat_list = [stat_0, stat_1, stat_2, stat_3];

                    
                    if(stat_list.includes(0)){
                        final_stat = `진행 중`
                    }else if(stat_list.includes(2)){
                        final_stat = `진행 중`
                    }else{
                        final_stat = `승인 완료`
                    };
                                        
                    tmp_body = tmp_body + `<tr><td>` + (i + 1) + `</td>`
                    tmp_body = tmp_body + `<td>` + apply_date + `</td>`
                    tmp_body = tmp_body + `<td>` + user_name + `</td>`
                    tmp_body = tmp_body + `<td><a href=/apply/approval/content/${form_id}>` + lec_title + `</td>`
                    tmp_body = tmp_body + `<td><a href="/apply/approval/${form_id}" class = "text-center">${final_stat}</td></tr>`    
                    // tmp_body = tmp_body + `<td><a href="/apply/approval/${(i+1)}/${form_id}" class = "text-center">${final_stat}</td></tr>`    
                    
            };
            var template = require('../lib/template.js');
            var html = template.APPROVE(tmp_body);

            response.send(html);
        };
        });           
        con.end();
    },

    SHOW3 : function(formId, sqlquery, response){
        var mysql = require('mysql');
        const vals = require('../info/consts_daim.js');

        var con = mysql.createConnection({
            host: vals.DBHost, port:vals.DBPort,
            user: vals.DBUser, password: vals.DBPass,
            connectionLimit: 5, database: vals.DB
        });

        // 연결되었는지 확인
        con.connect(function(err){
            if (err) throw err;
            console.log("You are connected");
        });

        // 수행하고 싶은 작업(sql문) 
        var sql = sqlquery;
        var params = formId;
        con.query(sql, params, function(error, result){
            try{
                var tmp_body = '';
                var apply_date = new Date(result[0].form_apply_date).toLocaleDateString();
                
                // for update 
                var form_id = result[0].form_id

                var user_name = result[0].form_user_name;
                var lec_title = result[0].form_lec_title;

                var appr_0 = result[0].form_appr_0;
                var appr_1 = result[0].form_appr_1;
                var appr_2 = result[0].form_appr_2;
                var appr_3 = result[0].form_appr_3;

                var stat_0 = result[0].appr_status_0;
                var stat_1 = result[0].appr_status_1;
                var stat_2 = result[0].appr_status_2;
                var stat_3 = result[0].appr_status_3;
                
                var final_stat = ``
                var stat_list = [stat_0, stat_1, stat_2, stat_3];
                if(stat_list.includes(0)){
                    final_stat = `진행 중`
                }else if(stat_list.includes(2)){
                    final_stat = `진행 중`
                }else{
                    final_stat = `승인 완료`
                };

                tmp_body = tmp_body + `<tr><td>` + form_id + `</td>`
                tmp_body = tmp_body + `<td>` + apply_date + `</td>`
                tmp_body = tmp_body + `<td>` + user_name + `</td>`
                tmp_body = tmp_body + `<td><a href=/apply/approval/content/${form_id}>` + lec_title + `</td>`
                tmp_body = tmp_body + `<td><a href="/apply/approval/${form_id}" class = "text-center">${final_stat}</td></tr>`

                
                var appr_list = [appr_0, appr_1, appr_2, appr_3]
                var tag_list = [``,``,``,``]
                for(var i=0; i < 4; i++){

                    var tag = `<select name = "approval" id = "selectAppr">`

                    if (stat_list[i] == 1){
                        stat_list[i] = '승인'

                        tag += `<option value=1 selected="selected">승인</option>
                        <option value=2>반려</option>
                        `
                    } 
                    else if (stat_list[i] == 0){
                        stat_list[i] = '검토중'
                        tag += `<option value = 0 selected="selected">선택</option>
                        <option value=1>승인</option>
                        <option value=2>반려</option>
                        `
                    }
                    else if (stat_list[i] == 2){
                        stat_list[i] = '반려'
                        tag += `<option value=1>승인</option>
                        <option value=2 selected>반려</option>`
                    }

                    tag += `</select>`

                    tag_list[i] = tag
                }

                var tmp_body2 = `
                
                <table class = "table table-responsive" >
                    <thead>
                    <tr class = "text-center">
                        <th style = "width: 10%"> 결재자 </th>
                        <th style = "width: 10%"> 현재 </th>
                        <th style = "width: 10%"> 승인/반려 </th>
                    </tr>
                    </thead>
                    <tbody class = "table table-hover">
                        <tr>
                            <td>${appr_list[0]}</td>
                            <td>${stat_list[0]}</td>
                            <td>${tag_list[0]} </td>
                        </tr>

                        <tr>
                            <td>${appr_list[1]}</td>
                            <td>${stat_list[1]}</td>
                            <td>${tag_list[1]} </td>
                        </tr>

                        <tr>
                            <td>${appr_list[2]}</td>
                            <td>${stat_list[2]}</td>
                            <td>${tag_list[2]} </td>
                        </tr>

                        <tr>
                            <td>${appr_list[3]}</td>
                            <td>${stat_list[3]}</td>
                            <td>${tag_list[3]} </td>
                        </tr>
                    </tbody>
                </table>`
            
            var template = require('../lib/template.js');
            var html = template.APPROVE2(form_id, tmp_body, tmp_body2);

            response.send(html);


            }catch(error){
                console.log(error);
                con.end();
                response.send('error')
            }
            
        });           
        con.end();
    },

    SHOW_CONTENT : function(sqlquery, response){
        var mysql = require('mysql');
        const vals = require('../info/consts_daim.js');

        var con = mysql.createConnection({
            host: vals.DBHost, port:vals.DBPort,
            user: vals.DBUser, password: vals.DBPass,
            connectionLimit: 5, database: vals.DB
        });

        // 연결되었는지 확인
        con.connect(function(err){
            if (err) throw err;
            console.log("You are connected");
        });

        // 수행하고 싶은 작업(sql문) 
        var sql = sqlquery;
        con.query(sql,function(error, result){
            try{
                                
                var apply_date = new Date(result[0].form_apply_date).toLocaleDateString();
                    
                var user_name = result[0].form_user_name;
                var lec_title = result[0].form_lec_title;
                var form_id = result[0].form_id;
            
                tmp_body = ``
                tmp_body = tmp_body + `<tr><td>` + form_id + `</td>`;
                tmp_body = tmp_body + `<td>` + apply_date + `</td>`
                tmp_body = tmp_body + `<td>` + user_name + `</td>`
                tmp_body = tmp_body + `<td><a href=/apply/list/${form_id}>` + lec_title + `</td></tr>`
                tmp_body2 = `
                <div class = "container" style = "border:2px dashed;" > 
                <br><br>                                
                <table class = "table table-responsive" style="table-layout: fixed" >  
                    <thead> 
                        <p class = "text-center btn-success" style = " width:20%;" > 강좌 정보 </p>                       
                        <tr class = "text-center">
                            <th class = "text-center"style = "width: 10%"> 강좌제목 </th>
                            <th class = "text-center"style = "width: 7%"> 시작일</th>
                            <th class = "text-center"style = "width: 7%"> 종료일 </th>
                            <th class = "text-center"style = "width: 7%"> 가격</th>
                            <th class = "text-center"style = "width: 30%"> 내용 </th>
                            <th class = "text-center"style = "width: 30%"> 필요성 </th>
                        </tr>
                    </thead>
                    <tbody class = "table-hover">`
                tmp_body2 = tmp_body2 + `<tr><td scope = "row"> <input type = "text"  name = "title" placeholder = "` + result[0].form_lec_title + `"></td>`
                var tmp_date = new Date(result[0].form_lec_start).toLocaleDateString()
                tmp_body2 = tmp_body2 + `<td scope = "row"> <input type = "text" name = "start" placeholder = "` + tmp_date + `"></td>`
                tmp_date = new Date(result[0].form_lec_end).toLocaleDateString()
                tmp_body2 = tmp_body2 + `<td scope = "row"> <input type = "text" name = "end" placeholder = "` + tmp_date + `"></td>`
                tmp_body2 = tmp_body2 + `<td scope = "row"> <input type = "text"  name = "price" placeholder = "` + result[0].form_lec_price + `"></td>`
                tmp_body2 = tmp_body2 + `<td scope = "row"> <input type = "text" class = "text-center" style = "width:100%" name = "content" placeholder = "` + result[0].form_lec_content + `"></td>`
                tmp_body2 = tmp_body2 + `<td scope = "row"> <input type = "text" class = "text-center" style = "width:100%" name = "purpose" placeholder = "` + result[0].form_purpose + `"></td></tr></tbody>
                </table>`

                tmp_body2 = tmp_body2 + `<br><br><br>
                <table class = "table table-responsive">
                    <thead>
                        <p class = "text-center btn-success" style = "width:20%;" > 교육기관 정보 </p>
                        
                        <tr class = "text-center">
                            <th class = "text-center" style = "width:20%"> 교육 on/off </th>
                            <th class = "text-center" style = "width:20%"> 교육 기관 </th>
                            <th class = "text-center" style = "width:60%"> 링크</th>
                        </tr>
                    </thead>
                    <tbody>
                `
                tmp_body2 = tmp_body2 + `<tr><td scope = "row" class = "text-center"> 
                                <label><input type = "radio" name = "edu_onoff" placeholder = "edu_onoff" value = "on"> on </label>&nbsp
                                <label><input type = "radio" name = "edu_onoff" placeholder = "edu_onoff" value = "off"> off </label></td>
                `
                tmp_body2 = tmp_body2 + `<td scope = "row"> <input class = "text-center" type = "text" name = "edu_org" placeholder = "` + result[0].form_lec_org + `"></td>`
                tmp_body2 = tmp_body2 + `<td scope = "row"> <input type = "text" class = "text-center" style = "width:100%"  name = "edu_link" placeholder = "` + result[0].form_lec_link + `"></td></tr></tbody></table>`

                        
    
                tmp_body2 = tmp_body2 + `<br><br><br>
                <table class = "table table-responsive table-hover table-xs pull-left">
                    <thead>
                        <p class = "text-center btn-success" style = "width:20%;" > 결재 </p>
                        <tr class = "text-center">
                            <th class = "text-center" > 본인 </th>
                            <th class = "text-center" > 팀장 </th>
                            <th class = "text-center" > 부사장 </th>
                            <th class = "text-center" > 대표이사 </th>
                        </tr>
                    </thead>
                `

                tmp_body2 = tmp_body2 + `
                <tbody><tr><td scope = "row"> <input type = "text" class = "text-center" style = "width:100%" name = "approval0" placeholder =
                "` + result[0].form_appr_0 +`"></td>`
                tmp_body2 = tmp_body2 + `
                <td scope = "row"> <input type = "text" class = "text-center" style = "width:100%" name = "approval1" placeholder =
                "` + result[0].form_appr_1 +`"></td>`
                tmp_body2 = tmp_body2 + `
                <td scope = "row"> <input type = "text" class = "text-center" style = "width:100%" name = "approval2" placeholder =
                "` + result[0].form_appr_2 +`"></td>`
                tmp_body2 = tmp_body2 + `
                <td scope = "row"> <input type = "text" class = "text-center" style = "width:100%" name = "approval3" placeholder =
                "` + result[0].form_appr_3 +`"></td></tr></tbody></table><br><br><br></div>`


                var template = require('../lib/template.js');
                var html = template.APPLY_LIST_CONTENT(tmp_body, tmp_body2);
                response.send(html);


            }catch(error){
                console.log(error);
                con.end();
                response.send('error')
            }
            
        });           
        con.end();

    },

    SHOW_CONTENT2 : function(sqlquery, response){
        var mysql = require('mysql');
        const vals = require('../info/consts_daim.js');

        var con = mysql.createConnection({
            host: vals.DBHost, port:vals.DBPort,
            user: vals.DBUser, password: vals.DBPass,
            connectionLimit: 5, database: vals.DB
        });

        // 연결되었는지 확인
        con.connect(function(err){
            if (err) throw err;
            console.log("You are connected");
        });

        // 수행하고 싶은 작업(sql문) 
        var sql = sqlquery;
        con.query(sql,function(error, result){
            try{

                var tmp_body = '';
                var apply_date = new Date(result[0].form_apply_date).toLocaleDateString();
                
                // for update 
                var form_id = result[0].form_id

                var user_name = result[0].form_user_name;
                var lec_title = result[0].form_lec_title;

                var stat_0 = result[0].appr_status_0;
                var stat_1 = result[0].appr_status_1;
                var stat_2 = result[0].appr_status_2;
                var stat_3 = result[0].appr_status_3;
                
                var final_stat = ``
                var stat_list = [stat_0, stat_1, stat_2, stat_3];
                if(stat_list.includes(0)){
                    final_stat = `진행 중`
                }else if(stat_list.includes(2)){
                    final_stat = `진행 중`
                }else{
                    final_stat = `승인 완료`
                };

                tmp_body = tmp_body + `<tr><td>` + form_id + `</td>`
                tmp_body = tmp_body + `<td>` + apply_date + `</td>`
                tmp_body = tmp_body + `<td>` + user_name + `</td>`
                tmp_body = tmp_body + `<td><a href=/apply/approval/content/${form_id}>` + lec_title + `</td>`
                tmp_body = tmp_body + `<td><a href="/apply/approval/${form_id}" class = "text-center">${final_stat}</td></tr>`
                

                tmp_body2 = `
                <div class = "container" style = "border:2px dashed;" > 
                <br><br>                                
                <table class = "table table-responsive" style="table-layout: fixed" >  
                    <thead> 
                        <p class = "text-center btn-success" style = " width:20%;" > 강좌 정보 </p>                       
                        <tr class = "text-center">
                            <th class = "text-center"style = "width: 10%"> 강좌제목 </th>
                            <th class = "text-center"style = "width: 7%"> 시작일</th>
                            <th class = "text-center"style = "width: 7%"> 종료일 </th>
                            <th class = "text-center"style = "width: 7%"> 가격</th>
                            <th class = "text-center"style = "width: 30%"> 내용 </th>
                            <th class = "text-center"style = "width: 30%"> 필요성 </th>
                        </tr>
                    </thead>
                    <tbody class = "table-hover">`
                tmp_body2 = tmp_body2 + `<tr><td scope = "row"> <input type = "text"  name = "title" placeholder = "` + result[0].form_lec_title + `"></td>`
                var tmp_date = new Date(result[0].form_lec_start).toLocaleDateString()
                tmp_body2 = tmp_body2 + `<td scope = "row"> <input type = "text" name = "start" placeholder = "` + tmp_date + `"></td>`
                tmp_date = new Date(result[0].form_lec_end).toLocaleDateString()
                tmp_body2 = tmp_body2 + `<td scope = "row"> <input type = "text" name = "end" placeholder = "` + tmp_date + `"></td>`
                tmp_body2 = tmp_body2 + `<td scope = "row"> <input type = "text"  name = "price" placeholder = "` + result[0].form_lec_price + `"></td>`
                tmp_body2 = tmp_body2 + `<td scope = "row"> <input type = "text" class = "text-center" style = "width:100%" name = "content" placeholder = "` + result[0].form_lec_content + `"></td>`
                tmp_body2 = tmp_body2 + `<td scope = "row"> <input type = "text" class = "text-center" style = "width:100%" name = "purpose" placeholder = "` + result[0].form_purpose + `"></td></tr></tbody>
                </table>`

                tmp_body2 = tmp_body2 + `<br><br><br>
                <table class = "table table-responsive">
                    <thead>
                        <p class = "text-center btn-success" style = "width:20%;" > 교육기관 정보 </p>
                        
                        <tr class = "text-center">
                            <th class = "text-center" style = "width:20%"> 교육 on/off </th>
                            <th class = "text-center" style = "width:20%"> 교육 기관 </th>
                            <th class = "text-center" style = "width:60%"> 링크</th>
                        </tr>
                    </thead>
                    <tbody>
                `
                tmp_body2 = tmp_body2 + `<tr><td scope = "row" class = "text-center"> 
                                <label><input type = "radio" name = "edu_onoff" placeholder = "edu_onoff" value = "on"> on </label>&nbsp
                                <label><input type = "radio" name = "edu_onoff" placeholder = "edu_onoff" value = "off"> off </label></td>
                `
                tmp_body2 = tmp_body2 + `<td scope = "row"> <input class = "text-center" type = "text" name = "edu_org" placeholder = "` + result[0].form_lec_org + `"></td>`
                tmp_body2 = tmp_body2 + `<td scope = "row"> <input type = "text" class = "text-center" style = "width:100%"  name = "edu_link" placeholder = "` + result[0].form_lec_link + `"></td></tr></tbody></table>`

                        
    
                tmp_body2 = tmp_body2 + `<br><br><br>
                <table class = "table table-responsive table-hover table-xs pull-left">
                    <thead>
                        <p class = "text-center btn-success" style = "width:20%;" > 결재 </p>
                        <tr class = "text-center">
                            <th class = "text-center" > 본인 </th>
                            <th class = "text-center" > 팀장 </th>
                            <th class = "text-center" > 부사장 </th>
                            <th class = "text-center" > 대표이사 </th>
                        </tr>
                    </thead>
                `

                tmp_body2 = tmp_body2 + `
                <tbody><tr><td scope = "row"> <input type = "text" class = "text-center" style = "width:100%" name = "approval0" placeholder =
                "` + result[0].form_appr_0 +`"></td>`
                tmp_body2 = tmp_body2 + `
                <td scope = "row"> <input type = "text" class = "text-center" style = "width:100%" name = "approval1" placeholder =
                "` + result[0].form_appr_1 +`"></td>`
                tmp_body2 = tmp_body2 + `
                <td scope = "row"> <input type = "text" class = "text-center" style = "width:100%" name = "approval2" placeholder =
                "` + result[0].form_appr_2 +`"></td>`
                tmp_body2 = tmp_body2 + `
                <td scope = "row"> <input type = "text" class = "text-center" style = "width:100%" name = "approval3" placeholder =
                "` + result[0].form_appr_3 +`"></td></tr></tbody></table><br><br><br></div>`


                var template = require('../lib/template.js');
                var html = template.APPLY_LIST_CONTENT2(tmp_body, tmp_body2);
                response.send(html);


            }catch(error){
                console.log(error);
                con.end();
                response.send('error')
            }
            
        });           
        con.end();

    },

    UPDATE : function(sqlquery,  response){
        var mysql = require('mysql');
        const vals = require('../info/consts_daim.js');

        var con = mysql.createConnection({
            host: vals.DBHost, port:vals.DBPort,
            user: vals.DBUser, password: vals.DBPass,
            connectionLimit: 5, database: vals.DB
        });

        // 연결되었는지 확인
        con.connect(function(err){
            if (err) throw err;
            console.log("You are connected");
        });

        // 수행하고 싶은 작업(sql문) 
        var sql = sqlquery;
        con.query(sql, function(error, result){
            if(error){
                console.log(error);
            } else{
                response.redirect('/apply/approval');
            }
        })

        //response.send('결재 중~');
        con.end();

    }
}

module.exports = dbconn;