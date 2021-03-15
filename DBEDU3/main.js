var express = require('express')

var fs = require('fs');
var bodyParser = require('body-parser');
var compression = require('compression')
var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var joinRouter = require('./routes/join');
var applyRouter = require('./routes/apply');
var helmet = require('helmet'); // 보안



// ------------------------------------------------------------------------

var app = express(); // return : express 객체

app.use(helmet()); // 보안
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());
app.get('*', function(request, response, next){
    next();
});

// /topic으로 시작하는 주소들에게 topicRouter를 적용한다.
app.use('/', indexRouter);
app.use('/join', joinRouter);
app.use('/login', loginRouter);
app.use('/apply', applyRouter);

// ------------------------------------------------------------------------

app.use(function(req, res, next){
  res.status(404).send('Sorry cant find that!')
});

// 에러를 핸들링하기위한 미들웨어로 약속함
app.use(function(err, req, res, next){
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

app.listen(3000, function() {
  console.log('Example app listening on port 3000!')
});