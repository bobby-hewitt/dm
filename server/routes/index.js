const authenticateRequest = require('../helpers/authenticateRequest')
var express = require('express');
var passport = require('passport');
var router = express.Router();
const User = require('../models/user')

router.post('/register', function (req, res) {
  req.body.email = req.body.email.toLowerCase()
  let user = Object.assign({},req.body)
  delete user.password
  User.register(new User(user), req.body.password, function (err, user) {
    if (err) {
      return res.status(400).send({ error: 'Email address in use.' })
    } else {
      res.status(200).send({ user: user.id });
    }
  });
});

router.post('/login', function (req, res, next) {
  console.log(req.body.email)
  console.log(req.body.password)
  
  passport.authenticate('local', function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }
    if (user) {
      user.lastLogin = (new Date).getTime()
      user.save()
      let userToSend = Object.assign({}, user);
      delete userToSend._doc.salt
      delete userToSend._doc.hash
      var token = jwt.sign({ id: user._id, email: user.email}, process.env.PW_SECRET);
      return res
        .status(200)
        .json({ token, user: userToSend });
      }
  })(req, res, next);
});

router.post('/authenticateWithJWT', function (req, res, next) {
  authenticateRequest(req, res, next).then((user) => {
    user.lastLogin = (new Date).getTime()
    user.save()
    res.send(user)
  })
  .catch((err) => {
     return res.status(401).json({ error: 'Invalid credentials.' });
  })
});