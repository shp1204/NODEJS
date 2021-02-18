const passport = require('passport');
const passportConfig = require('./passport'); 
// passport.index.js를 import해오겠습니다

passportConfig();

app.use(passport.initialize());
app.use(passport.session()); //이거 이후로 req.user 하면 사용자가 나옴

router.post('/login', isNotLoggedIn, (req, res, next) => {
    //미들웨어 안에 미들웨어
    //두번재 인자는 done이 전달해줌
    passport.authenticate('local', (authError, user, info) => {
        if (authError){ //없는 email일 경우
            console.error(authError);
            return next(authError);
        }
        if(!user){ //비번틀린경우
            return res.redirect(`/?loginError=${info.message}`);
        }
        return req.login(user, (loginError) => { //passport index.js 로간다
            if(loginError) {
                console.error(loginError);
                return next(loginError);
            }
            //세션 쿠키를 브라우저로 보내준다 -> 로그인된 상태
            return res.redirect('/'); //로그인 성공
        });
    }) (req, res, next); //미들웨어 안에 미들웨어에는 끝날때 (req, res, next)붙입니다.

});

passport.serializeUser((user, done) => {
    done(null, user.id); // 세션에 user의 id만 저장
});
