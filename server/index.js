//dependencies
const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
//helpers
const jwtExtractor = require('./helpers/jwtExtractor')
const authenticateRequest = require('./helpers/authenticateRequest')
//models
const User = require('./models/user')
//routes
const indexRoute = require('./routes/index');




//setup
const port = process.env.PORT || 9000
require('dotenv').config({path: '.env'})
app.use(cors());
app.use( bodyParser.json()); 
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
//setup routes
app.use('/api/', indexRoute);
//database connection
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_URL,  { useNewUrlParser: true });
mongoose.connection.on('error', function() {
    console.info('Error: Could not connect to MongoDB. Did you forget to run `mongod`?')
});
mongoose.connection.on('connected', function() {
    console.info('Successfully connected to the database')
});
mongoose.set('useCreateIndex', true);
//passport authentication
const options = {
 jwtFromRequest: jwtExtractor,
 passReqToCallback: true,
 secretOrKey: process.env.JWT_SECRET
}
passport.use('local', new LocalStrategy(User.authenticate()));
passport.use('jwt', new JwtStrategy(options, function(jwt_payload, user, done) {
    User.findOne({email: user.email}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    });
}));




app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))