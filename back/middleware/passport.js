const users = require("../Models/users");
const StrategyJwt = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const passport = require("passport");

var opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_KEY
}

passport.use(
    new StrategyJwt(opts, async (jwt_payload, done) => {
        try{
            const user = await users.findOne({_id: jwt_payload._id}).select("-password");
            user ? done(null, user) : done(null, false);
        }
        catch(error){
            console.log(error);
        }
    })
)

module.exports = isAuth = () => passport.authenticate("jwt", {session: false});
