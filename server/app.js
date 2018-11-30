require('dotenv').config({path: '.env'})
const cors = require('cors');
const express = require('express');
const app = express();
const UserRoutes = require('./routes/user');
const User = require('./models/user')
const passport = require('passport')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const authenticateRequest = require('./helpers/authenticateRequest')
const LocalStrategy = require('passport-local').Strategy;
const PrivateRoutes = require('./routes/private');
const JwtStrategy = require('passport-jwt').Strategy;
const jwtExtractor = require('./helpers/jwtExtractor');
const bodyParser = require("body-parser")
app.use(bodyParser());
passport.use('local', new LocalStrategy(User.authenticate()));
const options = {
 jwtFromRequest: jwtExtractor,
 passReqToCallback: true,
 secretOrKey: process.env.JWT_SECRET
}
// Configure Passport to use local strategy for initial authentication.

// Configure Passport to use JWT strategy to look up Users.
passport.use('jwt', new JwtStrategy(options, function(jwt_payload, user, done) {
    
    // User.findOne({email: user.email}, function(err, user) {
    //     if (err) {
    //         return done(err, false);
    //     }
    //     if (user) {
    //         return done(null, user);
    //     } else {
    //         return done(null, false);
    //     }
    // });
}));

const db = require('./db');

app.use(cors())

app.use(cookieParser());

app.use('/api', authenticateRequest, PrivateRoutes)

app.use('/users', UserRoutes);





module.exports = app;