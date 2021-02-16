// require() : 현재 실행하는 폴더 내에 cal.js 모듈 사용
var cal = require('./cal');
 
console.log(cal.plus(4, 2));
console.log(cal.minus(4, 2));
console.log(cal.mult(4, 2));
console.log(cal.divi(4, 2));