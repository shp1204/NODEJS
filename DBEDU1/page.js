var http = require('http'); 
var fs = require('fs'); 
var url = require('url'); 
var qs = require('querystring');

var app = http.createServer(function(request,response){ 
    var _url = request.url; 
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname; 
    var title = queryData.id; 
 

    if(pathname === '/'){ 
        if(queryData.id === undefined){
            var title = 'Welcome';
            var description = "환영합니다! : )";
            response.writeHead(200); 
            var template = ` 
            <!doctype html> 
            <html> 

            <head><title>WEB1 - ${title}</title> <meta charset="utf-8"></head> 

            <body>
            <h1><a href="/">DAIM</a></h1>
            <h2>${description}</h2>
            <ul>
                <form action = "/login_process" method = "post">
                <input type = "submit" value = "login">
                </form>
            </ul>
            <ul>
                <form action = "/join_process" method = "post">
                <input type = "submit" value = "join">
                </form>
            </ul>
            </body> 
            </html> `; 
            response.writeHead(200);
            response.end(template); 
        } else {
            var title = queryData.id;
            response.writeHead(200);
        }
    }else if(pathname === '/join'){
        var title = '회원가입';
        var description = "환영합니다! : )";
               
    } else if(pathname === '/join_process'){
        var body = '';
            request.on('data', function(data){
            body = body + data;
        });
        request.on('end', function(){
            var post = qs.parse(body);
            var title = post.title;
            var description= post.description;
        
            console.log(post);

        // 파일 저장해주자
        response.writeHead(302, {Location : `/?id=${qs.escape(title)}`});
        response.end();

        });
    }

    if(pathname == '/favicon.ico'){ 
        return response.writeHead(404); 
    }; 
});
    app.listen(3000);
