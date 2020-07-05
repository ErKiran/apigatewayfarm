const { Strategy, ExtractJwt } = require('passport-jwt');
const {User} = require('../models');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;

module.exports = async passport => {
    const res = new Strategy(opts, async (payload, done) => {
        try {
            const result = await User.findOne({where:{id:payload.id}});
            if (result) {
                return done(null, result)
            }
            else {
                return done(null, false)
            }
        }
        catch (e) {
            throw e
        }
    });
    passport.use(res);
};