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
                    
                    var apply_date = new Date(result[i].form_apply_date);
                    var apply_date =  apply_date.getUTCFullYear().toString() + `-` +  apply_date.getUTCMonth().toString() + `-` + apply_date.getUTCDate().toString()
                    
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
        //response.send('완료');
    }
    
}

module.exports = dbconn;