
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const Sec = require('../models/secretaire');
const key = require('./keys').secret;

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = key;

module.exports = passport => {
    passport.use(
        new JwtStrategy(opts,(jwt_payload, done)=> {
            Sec.findById(jwt_payload._id).then(sec => {
                if(sec) return done(null, sec);
                return done(null, false); 
            }).catch(err => {
                console.log(err);
            });
        })
    )
};