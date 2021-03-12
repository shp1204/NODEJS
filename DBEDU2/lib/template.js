var template = {
    // <h1><a href="/">DAIM</a></h1>
    MAIN : function(title, body){
        return `
        <!doctype html>
        <html>
        <head>
            <title>${title}</title>
            <meta charset="utf-8">
        </head>
        <body>
            <h1>DAIM</h1>
            ${body}
        </body>
        </html>
      `;
    },
    JOIN : function(title){
        return `
        <!doctype html> 
        <html> 
        <head><title>${title}</title> <meta charset="utf-8"></head> 
        <body>
            <h2>회원 가입</h2>
            <form action = "/join/process" method = "post">
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
    },
    LOGIN : function(title){
        return `
        <!doctype html> 
        <html> 
        <head><title>${title}</title> <meta charset="utf-8"></head> 
        <body>
            <h2>로그인</h2>
            <form action = "/login/process" method = "post">
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
    },
    APPLY : function(title){
        return `
        <!doctype html>
        <html lang="en"> 
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>교육 신청서 작성</title> <meta charset="utf-8">
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
        </head> 
        <body>
            <h1 class="text-center" > 교육 신청서 </h1>
            <form action = "/apply/process" method = "post">
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

            
            <table class = "table table-responsive">
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

            <br><br><br>

            
            <table class = "table table-responsive table-hover table-xs pull-left">
                <thead>
                    <p class = "text-center btn-success" style = "border-style: dotted; width:20%;" > 결재 </p>

                    <tr class = "text-center">
                        <th> 본인 </th>
                        <th> 결재1 </th>
                        <th> 결재2 </th>
                        <th> 결재3 </th>
                    </tr>
                </thead>
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
        
        `
    },
    APPLY_LIST : function(tmp_body){
        return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>신청 목록</title>
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">

        </head>
        <body>
            <form action = "/apply" method = "get">
            <br><br>
            
            <h1 class="text-center" > 신청 목록 </h1>

            <br><br>

            <div class = "containter" >  
                <table class = "table table-responsive" >
                    <thead>
                    <tr class = "text-center">
                        <th style = "width: 5%"> 번호 </th>
                        <th style = "width: 10%"> 신청일자 </th>
                        <th style = "width: 10%"> 신청자 </th>
                        <th style = "width: 30%"> 강좌 제목 </th>
                    </tr>
                    </thead>
                    <tbody class = "table table-hover">
                        ${tmp_body}
                    </tbody>
                </table>

                <br>
                <br>
                <br>
                
                <hr/>
                
                
                <input type = "submit" class = "text-center btn-primary btn-right" style="float: right;" value= "신청서 작성하기">
                </form>
            </div>
            
            <script src = "js/jquery-3.1.1.js"></script>
            <scriptsrc src = "js/bootstrap.js"></script>
        </body>
        </html>
        `
    },
    APPROVE : function(tmp_body){
        return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>결재 목록</title>
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
            
        </head>
        <body>
            
            <br><br>
            <h1 class="text-center" > 결재 목록 </h1>
            <form action = "apply/approval" method = "get">
            <br><br>

            <div class = "containter" >  
                <table class = "table table-responsive" >
                    <thead>
                    <tr class = "text-center">
                        <th style = "width: 5%"> 번호 </th>
                        <th style = "width: 10%"> 신청일자 </th>
                        <th style = "width: 10%"> 신청자 </th>
                        <th style = "width: 20%"> 강좌 제목 </th>
                        <th style = "width: 20%"> 결재 상태 </th>
                        <th style = "width: 10%"> 결재 승인 일자 </th>
                    </tr>
                    </thead>
                    <tbody class = "table table-hover">
                        ${tmp_body}
                        
                    </tbody>
                </table>

                <br>
                <br>
                <br>
                
                <hr/>

                
            </div>
            
            <script src = "js/jquery-3.1.1.js"></script>
            <scriptsrc src = "js/bootstrap.js"></script>
        </body>
        </html>
        `
    },
    APPROVE2 : function(pageId, tmp_body, tmp_body2){
        return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>결재 목록</title>
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
            
        </head>
        <body>
            
            <br><br>
            <h1 class="text-center" > 결재 목록 </h1>
            <form action = "/apply/approval/process/${pageId}" method = "get">
            <br><br>

            <div class = "containter" >  
                <table class = "table table-responsive" >
                    <thead>
                    <tr class = "text-center">
                        <th style = "width: 5%"> 고유번호 </th>
                        <th style = "width: 10%"> 신청일자 </th>
                        <th style = "width: 10%"> 신청자 </th>
                        <th style = "width: 20%"> 강좌 제목 </th>
                        <th style = "width: 20%"> 결재 상태 </th>
                        <th style = "width: 10%"> 결재 승인 일자 </th>
                    </tr>
                    </thead>
                    <tbody class = "table table-hover">
                        ${tmp_body}
                    </tbody>
                </table>

                <br><br><br>

                ${tmp_body2}

                <input type = "submit" class = "text-center btn-primary btn-right" style="float: right;" value= "확인">
            </div>

            
            
            <script src = "js/jquery-3.1.1.js"></script>
            <scriptsrc src = "js/bootstrap.js"></script>
        </body>
        </html>
        `
    }
  };

  module.exports = template;