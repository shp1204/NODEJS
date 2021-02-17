
// 미리 npm install mysql 로 설치하기
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

// 넣고싶은 정보
const info = {
    "name": 'sohee',
    "department" : "IT 개발팀",
    "id" : "shpark",
    "pw" : "1234",
    "email": 'wow@mail.com'
};

// 수행하고 싶은 작업(sql문) 
var sql = 'INSERT INTO tb_user(user_name, user_department, user_id, user_pw, user_email) VALUES(?,?,?,?,?)';
var params = [info['name'], info['department'], info['id'], info['pw'], info['email']]
con.query(sql, params, function(err, rows, fields){
    if(err){
        console.log(err);
    } else{
        console.log(rows.name);
    }
});

con.end();