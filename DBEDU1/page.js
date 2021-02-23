var http = require('http'); 
var fs = require('fs'); 
var url = require('url'); 
var qs = require('querystring');

var express = require('express');
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
var bodyParser = require('body-parser');
var passport = require("passport"), 
    LocalStrategy = require("passport-local").Strategy;
const { connectionLimit } = require('./info/consts_daim.js');

var app = http.createServer(function(request,response){ 
    var _url = request.url; 
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname; 
    var title = queryData.id; 
 

    if(pathname === '/'){  // 회원가입, 로그인 선택
        if(queryData.id === undefined){
            var title = 'Welcome';
            var description = "환영합니다! : )";
            response.writeHead(200); 
            var template = ` 
            <!doctype html> 
            <html> 

            <head><title>${title}</title> <meta charset="utf-8"></head> 

            <body>
            <h1><a href="/">DAIM</a></h1>
            <h2>${description}</h2>
            <ul>
                <a href = "/login">login</a>
            </ul>
            <ul>
                <a href = "/join">join</a>
            </ul>
            </body> 
            </html> `; 
            response.writeHead(200);
            response.end(template); 
        } else {
            var title = queryData.id;
            response.writeHead(200);
        }
    } else if(pathname === '/join'){
        var title = '회원가입';
        var description = "환영합니다! : )";
        var html = `
        <!doctype html> 
        <html> 
        <head><title>${title}</title> <meta charset="utf-8"></head> 
        <body>
            <h2>회원 가입</h2>
            <form action = "/join_process" method = "post">
            <ul>
                <p> 이름  
                <input type = "text" name = "name" placeholder = "name">
                </p>
            </ul>
            <ul>
                <p>  부서  
                <select name="department">                    
                    <option value="1">R&D</option>              
                    <option value="2">IT개발</option>     
                    <option value="3">경영관리</option>
                </select>
                </p>
            </ul>
            <ul>
                <p> 사용하실 ID  
                <input type = "text" name = "id" placeholder = "id">
                </p>
            </ul>
            <ul>
                <p> 비밀번호  
                <input type = "text" name = "pw" placeholder = "pw">
                </p>
            </ul>
            <ul>
                <p> 비밀번호 확인 
                <input type = "text" name = "pw_check" placeholder = "pw_check">
                </p>
            </ul>
            <ul>
                <p> 회사 E-mail 주소
                <input type = "text" name = "mail" placeholder = "mail" value = "###@mail.com">
                </p>
            </ul>
            <p>
                <input type="submit" value = "가입하기">
            </p>
            </form>

        </body> 
        </html>
        `;
        response.writeHead(200);
        response.end(html);

    } else if(pathname === '/join_process'){
        // join에서 submit 하면 여기에서 데이터를 db로 넘겨주자
        var body = '';
        request.on('data', function(data){
            body = body + data;
        });
        request.on('end', function(req){
            var post = qs.parse(body);
            const obj = JSON.parse(JSON.stringify(post)); 
            var keys = Object.keys(obj);
            // for (var i=0; i < keys.length; i++){
            //     console.log(obj[keys[i]]);
            // }

            var mysql = require('mysql');
            // 정보를 담은 파일
            const vals = require('./info/consts_daim.js');
            // 연결을 위한 정보 불러오기
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
            var sql = 'INSERT INTO tb_user(user_name, user_department, user_id, user_pw, user_email) VALUES(?,?,?,?,?)';
            var params = [obj[keys[0]],obj[keys[1]],obj[keys[2]],obj[keys[4]],obj[keys[5]]]
            con.query(sql, params, function(err, rows, fields){
                if(err){
                    console.log(err);
                } else{
                    console.log(rows.name);
                }
            });

            con.end();

            // 전송 후 첫화면으로 돌아간다.
            response.writeHead(302, {Location : `/`});
            response.end();
           
        });
    } else if(pathname === '/login'){
        var title = '로그인';
        var description = "ID와 PW를 입력해주세요.";
        var html = `
        <!doctype html> 
        <html> 
        <head><title>${title}</title> <meta charset="utf-8"></head> 
        <body>
            <h2>로그인</h2>
            <form action = "/login_process" method = "post">
            <ul>
                <p> ID
                <input type = "text" name = "id" placeholder = "id">
                </p>
            </ul>
            <ul>
                <p> PW
                <input type = "text" name = "pw" placeholder = "pw">
                </p>
            </ul>
            <p>
                <input type="submit" value = "로그인">
            </p>
            </form>

        </body> 
        </html>
        `;
        response.writeHead(200);
        response.end(html);
    } else if(pathname === '/login_process'){
        var body = '';
        request.on('data', function(data){
            body = body + data;
        });
        
        request.on('end', function(req){
            var post = qs.parse(body);
            const obj = JSON.parse(JSON.stringify(post));
            var keys = Object.keys(obj);

            var mysql = require('mysql');
            // 정보를 담은 파일
            const vals = require('./info/consts_daim.js');
            // 연결을 위한 정보 불러오기
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

            //_____________________________________________________ 
            // + 추가하고 싶은 기능 : alert
            //_____________________________________________________ 
            // id o
                // pw o 첫화면으로
                // pw x 로그인화면으로
            // id x
                // 회원가입창 
            //______________________________________________________
            var sql = 'SELECT user_id, user_pw FROM tb_user WHERE user_id = ?';
            var params = [obj[keys[0]]];
            con.query(sql, params, function(err, result){
                try {
                    // 사용자가 입력한 id
                    var input_id = obj[keys[0]];
                    var input_pw = obj[keys[1]];

                    var valid_id = result[0].user_id;
                    var valid_pw = result[0].user_pw;

                    if(input_id === valid_id){
                        if(input_pw === valid_pw){
                            console.log('로그인 성공!');
                            con.end();
                            response.writeHead(302, {Location : `/login_success`});
                            response.end();
                            
                        } else {
                            console.log('비밀번호를 확인하세요');
                            con.end();
                            response.writeHead(302, {Location : `/login`});
                            response.end();

                        };
                    }                    
                } catch (error) {
                    console.log('존재하지 않는 회원입니다');
                    con.end();
                    response.writeHead(302, {Location : `/join`});
                    response.end();
                }
            });
            
        });
    } else if(pathname === '/login_success'){ // 여기에서 목록, 결재, 신청서를 선택하는 tab 생성
        var title = '어서오세요';
            response.writeHead(200); 
            var template = ` 
            <!doctype html> 
            <html> 

            <head><title>${title}</title> <meta charset="utf-8"></head> 

            <body>
            <ul>
                <a href = "/apply">교육 신청서 작성하기</a>
            </ul>
            <ul>
                <a href = "/apply_list">교육 신청 목록 확인하기</a>
            </ul>
            <ul>
                <a href = "/approval"> 결재하기 </a>
            </ul>
            </body> 
            </html> `; 
            response.writeHead(200);
            response.end(template);

    } else if(pathname === '/apply_list'){ // 목록
        console.log("신청 목록");
        response.writeHead(200);
        response.end("신청 목록");
    } else if(pathname === '/apply'){ // 신청서
        var title = '교육 신청서';
        var html = `
        <!doctype html>
        <html lang="en"> 
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>로그인 성공</title> <meta charset="utf-8">
        </head> 
        <body>
            <h1 class="text-center" > 교육 신청서 </h1>
            <form action = "/apply_process" method = "post">
            <div class = "container"> 
            <p class = "text-center" style="float: right;"> 
            신청일 <input type = "date" id="now_date" name = "date" placeholder = "date">
            신청자 <input type = "text" name = "user_name" placeholder = "user_name"></p>
                                                    
            <br><br>
            
            <table class = "table table-responsive"  >  
                <thead> 
                    <p class = "text-center btn-success" style = "border-style: dotted; width:20%;" > 강좌 정보 </p>
                    
                    <tr class = "text-center">
                        <th style = "width: 5%"> 강좌제목 </th>
                        <th style = "width: 5%"> 시작일</th>
                        <th style = "width: 5%"> 종료일 </th>
                        <th style = "width: 5%"> 가격</th>
                        <th style = "width: 40%"> 내용 </th>
                        <th style = "width: 40%"> 필요성 </th>
                        
                    </tr>
                </thead>
                <tbody class = "table-hover">
                
                    <tr>
                        <td scope = "row"> <input type = "text" class = "text-center" name = "title" placeholder = "title"></td>
                        <td scope = "row"> <input type = "date" name = "start" placeholder = "start"> </td>
                        <td scope = "row"> <input type = "date" name = "end" placeholder = "end"> </td>
                        <td scope = "row"> <input type = "text" class = "text-center" name = "price" placeholder = "price"> </td>
                        <td scope = "row"> <input type = "text" class = "text-center" style = "width:100%" name = "content" placeholder = "content"> </td>
                        <td scope = "row"> <input type = "text" class = "text-center" style = "width:100%" name = "purpose" placeholder = "purpose"> </td>
                </tr>
                </tbody>
            </table>

            <br>
            <br>
            <br>

            
            <table class = "table table-hover table-xs pull-left">
                <thead>
                    <p class = "text-center btn-success" style = "border-style: dotted; width:20%;" > 교육기관 정보 </p>
                    
                    <tr class = "text-center">
                        <th style = "width:20%"> 교육 on/off </th>
                        <th style = "width:20%"> 교육 기관 </th>
                        <th style = "width:60%"> 링크</th>
                    </tr>
                </thead>
                <tbody>
                    
                    <tr>
                        <td scope = "row" class = "text-center"> 
                            <label><input type = "radio" name = "edu_onoff" placeholder = "edu_onoff" value = "on"> on </label>&nbsp
                            <label><input type = "radio" name = "edu_onoff" placeholder = "edu_onoff" value = "off"> off </label>
                        </td>
                        <td scope = "row"> <input class = "text-center" type = "text" name = "edu_org" placeholder = "edu_org"></td>
                        <td scope = "row"  > <input type = "text" class = "text-center" style = "width:100%"  name = "edu_link" placeholder = "edu_link"></td>
                    </tr>
                </tbody>
            </table>

            <br>
            <br>
            <br>

            
            <table class = "table table-hover">
                <thread>
                    <p class = "text-center btn-success" style = "border-style: dotted; width:20%;" > 결재 </p>
                    <tr class = "text-center">
                        <th> 본인 </th>
                        <th> 결재1 </th>
                        <th> 결재2 </th>
                        <th> 결재3 </th>
                    </tr>
                </thread>
                <tbody>
                    <tr>
                        <td scope = "row"> <input type = "text" class = "text-center" style = "width:100%" name = "approval0" placeholder = "approval0"></td>
                        <td scope = "row"> <input type = "text" class = "text-center" style = "width:100%" name = "approval1" placeholder = "approval1"></td>
                        <td scope = "row"> <input type = "text" class = "text-center" style = "width:100%" name = "approval2" placeholder = "approval2"></td>
                        <td scope = "row"> <input type = "text" class = "text-center" style = "width:100%" name = "approval3" placeholder = "approval3"></td>
                    </tr>
                </tbody>
            </table>
            
            <br><br><br>

            
            <input type = "submit" class = "text-center btn-primary btn-lg btn-right" style="float: right;" value= "신청하기">
        </div>

        
        </form>
        <script> document.getElementById('now_date').value = new Date().toISOString().slice(0, 10)</script>
        <script src = "js/jquery-3.1.1.js"></script>
        <scriptsrc src = "js/bootstrap.js"></script>
        </body>
        </html>
       `; 
        response.writeHead(200);
        response.end(html); 

    } else if(pathname === '/apply_process'){
        var body = '';
        request.on('data', function(data){
            body = body + data;
        });
        request.on('end', function(req){
            var post = qs.parse(body);
            const obj = JSON.parse(JSON.stringify(post)); 
            var keys = Object.keys(obj);
            // for (var i=0; i < keys.length; i++){
            //     console.log(obj[keys[i]]);
            // }

            var mysql = require('mysql');
            // 정보를 담은 파일
            const vals = require('./info/consts_daim.js');
            // 연결을 위한 정보 불러오기
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
            var sql = 'INSERT INTO tb_application_form(form_apply_date, form_user_name, form_lec_title, form_lec_start, form_lec_end, form_lec_price, form_lec_content, form_purpose, form_lec_onoff, form_lec_org, form_lec_link,form_appr_0, form_appr_1, form_appr_2, form_appr_3) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
            var params = [obj[keys[0]],obj[keys[1]],obj[keys[2]],obj[keys[3]],obj[keys[4]],
            obj[keys[5]],obj[keys[6]],obj[keys[7]],obj[keys[8]],obj[keys[9]],obj[keys[10]],
            obj[keys[11]],obj[keys[12]],obj[keys[13]],obj[keys[14]]]
            con.query(sql, params, function(err, rows, fields){
                if(err){
                    console.log(err);
                } else{
                    console.log(rows.name);
                }
            });

            con.end();

            // 전송 후 목록으로 돌아간다.
            
            response.writeHead(302, {Location : `/login_success`}); // apply_list
            response.end();
           
        });

    } else if(pathname === '/approval'){ // 결재
        console.log("결재 화면");
        response.writeHead(200);
        response.end("결재 화면");
    } else if(pathname === '/approval_process'){
        console.log("결재 프로세스");
        response.writeHead(200);
        response.end("결재 프로세스");
    };
    if(pathname == '/favicon.ico'){ 
        return response.writeHead(404); 
    }; 
});

app.listen(3000);
