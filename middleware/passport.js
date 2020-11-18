const passport = require('passport');
const passportJWT = require('passport-jwt');

const ExtractJWT = passportJWT.ExtractJwt;

const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = passportJWT.Strategy;

const config = require('config');
const bcrypt = require('bcryptjs');

const User = require('../models/User');

passport.use(
    'login',
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
        },
        async (email, password, done) => {
            try {
                const user = await User.findOne({ email });
                if (!user) {
                    return done(null, false, { message: 'Incorrect email or password' });
                }

                const isMatch = await bcrypt.compare(password, user.password);
                if (!isMatch) {
                    return done(null, false, { message: 'Incorrect email or password' });
                }

                return done(null, user, { message: 'Logged in Successfully' });
            } catch (err) {
                return done(err);
            }
        }
    )
);

const jwtOptions = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.get('jwtSecret'),
};

passport.use(
    'jwt',
    new JWTStrategy(jwtOptions, async (jwtPayload, done) => {
        try {
            const user = await User.findById(jwtPayload.user.id).select('-password');
            return done(null, user);
        } catch (err) {
            return done(err);
        }
    })
);
