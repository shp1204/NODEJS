
const mdbConn = require('./mariaDBConn.js')
const express = require('express');
const { connectionLimit } = require('./consts.js');
const app = express();

// insert
mdbConn.insertUserData()
.then((rows) => {
  console.log("성공!");
})


// read
mdbConn.getUserList()
  .then((rows) => {
    console.log(rows);
  })
  .catch((errMsg) => {
    console.log(errMsg);
  });


const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`listening on ${port}`);
});

