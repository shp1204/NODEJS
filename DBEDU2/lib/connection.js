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
                    // .toLocaleString("ko-KR", {timeZone : "Asia/Seoul"});
                    
                    
                    var user_name = result[i].form_user_name;
                    var lec_title = result[i].form_lec_title;
                
                    tmp_body = tmp_body + `<tr><td>` + (i + 1) + `</td>`;
                    tmp_body = tmp_body + `<td>` + apply_date + `</td>`
                    tmp_body = tmp_body + `<td>` + user_name + `</td>`
                    tmp_body = tmp_body + `<td>` + lec_title + `</td></tr>`
    
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
                    if(0 in stat_list){
                        final_stat = `진행 중`
                    }else if(2 in stat_list){
                        final_stat = `진행 중`
                    }else{
                        final_stat = `승인`
                    };
                                        
                    tmp_body = tmp_body + `<tr><td>` + (i + 1) + `</td>`
                    tmp_body = tmp_body + `<td>` + apply_date + `</td>`
                    tmp_body = tmp_body + `<td>` + user_name + `</td>`
                    tmp_body = tmp_body + `<td>` + lec_title + `</td>`
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
                if(0 in stat_list){
                    final_stat = `진행 중`
                }else if(2 in stat_list){
                    final_stat = `진행 중`
                }else{
                    final_stat = `승인`
                };

                tmp_body = tmp_body + `<tr><td>` + form_id + `</td>`
                tmp_body = tmp_body + `<td>` + apply_date + `</td>`
                tmp_body = tmp_body + `<td>` + user_name + `</td>`
                tmp_body = tmp_body + `<td>` + lec_title + `</td>`
                // tmp_body = tmp_body + `<td><a href="/apply/approval/${(idx+1)}/${form_id}" class = "text-center">${final_stat}</td></tr>`
                tmp_body = tmp_body + `<td><a href="/apply/approval/${form_id}" class = "text-center">${final_stat}</td></tr>`

                
                var appr_list = [appr_0, appr_1, appr_2, appr_3]
                var tag_list = [``,``,``,``]
                for(var i=0; i < 4; i++){

                    var tag = `<select name = "approval" id = "selectAppr">`

                    if (stat_list[i] == 1){
                        stat_list[i] = '승인'

                        tag += `<option value=1 selected="selected">승인</option>`
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
                        tag += `<option value=2 selected>반려</option>`
                    }

                    tag += `</select>`

                    tag_list[i] = tag
                }

                // var tag = `
                // <select name = "approval" id = "selectAppr">
                // <option value="none" selected disabled hidden>선택</option>
                // <option value=1>승인</option>
                // <option value=2>반려</option>
                // </select>
                // `;


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