// 미리 npm install mysql 로 설치하기
var mysql = require('mysql');
// 정보를 담은 파일
const vals = require('./info/consts_test.js');  // './info/consts_daim.js'
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
    "name": 'wow',
    "email": 'wow@mail.com',
    "age" : '25'
};

// 수행하고 싶은 작업(sql문) 
// 이 때, mariaDB에 생성한 TABLE의 column명이 같아야한다.
// INSERT INTO TABLE이름(COLUMN1, COLUMN2, COLUMN3) VALUES(?,?,?)
var sql = 'INSERT INTO users2(user_name, user_email, user_age) VALUES(?,?,?)';
var params = [info['name'], info['email'], info['age']]
con.query(sql, params, function(err, rows, fields){
    if(err){
        console.log(err);
    } else{
        console.log(rows.name);
    }
});





con.end();