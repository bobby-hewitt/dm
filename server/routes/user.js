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
	console.log('in user post')
	UserController.post(req.body)
	.then((user) => {
		res
			.status(200)
			.send(user)
	})
	.catch((err) => {
		res.status(500).send(err)
	})  
});

router.post('/login', (req, res, next) => {
	passport.authenticate('local', function (err, user, info) {
	    if (err) {
	    	console.log("ERROR")
	    	console.log(err)
	    	res.status(500).send('err');
	    }
	    else if (!user) {
	    	console.lgo('no user')
	    	res.status(500).send('Invalid credentials')
	    }
	    else if (user) {
	    	console.log('resolving')
	     	var token = jwt.sign({ id: user._id, email: user.email}, process.env.JWT_SECRET);      
	        // res.send('woooboooo')
	        res

	        	.status(200)
	        	res.cookie('jwt', token)
	        	.send({ user });
	    }
	})
});


module.exports = router;