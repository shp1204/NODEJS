function plus(a,b){
    return a+b;
}
 
function minus(a,b){
    return a-b;
}
 
function multiplication(a,b){
    return a*b;
}
 
function division(a,b){
    return a/b;
}
 
// 현재 소스를 모듈로 export
module.exports = {
    plus: plus,
    minus: minus,
    mult: multiplication,
    divi: division
}