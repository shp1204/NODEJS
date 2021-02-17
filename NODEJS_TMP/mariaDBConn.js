const mariadb = require('mariadb');
const vals = require('./consts.js');
 
const pool = mariadb.createPool({
    host: vals.DBHost, port:vals.DBPort,
    user: vals.DBUser, password: vals.DBPass,
    connectionLimit: 5, database: vals.DB
});

async function insertUserData(){
    let conn;
    try{
        conn = await pool.getConnection();
        const info = {
            "name": 'Jiwon',
            "email": 'jiwon@mail.com',
            "age" : '22'
        };

        // insert using SQL
        // const result = await 
        var sql = 'INSERT INTO users2(name, email, age) VALUES(?,?,?)';
        var params = [info['name'], info['email'], info['age']]
        conn.query(sql, params, function(err, rows, fields){
            if(err){
                console.log(err);
            } else{
                console.log(rows.name);
            }
        });
    }
    catch(err){
        throw err;
    }
    finally{
        if (conn) conn.release();
    }
    
}
 
async function GetUserList(){
    let conn, rows;
    try{
        conn = await pool.getConnection();

        conn.query('USE nodejs_test'); // database

        rows = await conn.query('SELECT * FROM users2');
    }
    catch(err){
        throw err;
    }
    finally{
        if (conn) conn.end();
        return rows[0];
    }
}
 
module.exports = {
    insertUserData : insertUserData,
    getUserList: GetUserList
}
