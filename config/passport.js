let JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

let config = require('../config/database'); // get db config file

module.exports = function(passport, user) {
    let User = user;
    let opts = {};

    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
    opts.secretOrKey = config.secret;

    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {

        User.findOne({
            where: {
                id: jwt_payload.id
            }
        }).then((user) => {

            if (user) {
                done(null, user);
            } else {
                done(null, false);
            }
        }).catch((err) => {
            if (err) {
                return done(err, false);
            }
        });
    }));
};