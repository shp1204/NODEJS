const passport = require('passport');
const local = require('./localStrategy.js');
const User = require('../models/user');


module.exports= () => { //req.login의 user가 여기쓰임
    passport.serializeUser((user, done) => {
        done(null, user.id); // 세션에 user의 id만 저장
    });

    passport.deserializeUser((id, done) => {
        User.findOne({ where: {id} })
            .then(user => done(null, user))
            .catch(err => done(err));
    });

    local();
    
};
