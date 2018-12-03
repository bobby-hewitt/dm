var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
const UserController = require('../controllers/userController')
var User = require('../models/user');
const passport = require('passport')
const jwt = require('jsonwebtoken')


router.post('/', function (req, res) {
	UserController.post(req.body)
	.then((user) => {
		res.status(200).send(user)
	})
	.catch((err) => {
		res.status(500).send(err)
	})  
});

router.post('/login', (req, res, next) => {
	passport.authenticate('local', function (err, user, info) {
	    if (err) return res.status(500).send('err');
	    else if (!user) return res.status(500).send('Invalid credentials')
	    else if (user) {
	     	var token = jwt.sign({ id: user._id, email: user.email}, process.env.JWT_SECRET);      
	        res.status(200).cookie('jwt', token).send({ token, user });
	    }
	})(req,res,next);
})


module.exports = router;