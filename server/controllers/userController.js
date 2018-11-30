var User = require('../models/user');
const passport = require('passport')
const jwt = require('jsonwebtoken')


exports.login = function(req, res, next) {
console.log('authenticated',req.body)
	passport.authenticate('local', function (err, user, info) {

	    if (err) {
	    	// console.log(;)
	    	console.log(err)
	    	res.status(500).send('err');
	    }
	    else if (!user) res.status(500).send('Invalid credentials')
	    else if (user) {
	    	console.log('resolving')
	     	var token = jwt.sign({ id: user._id, email: user.email}, process.env.JWT_SECRET);      
	        // res.send('woooboooo')
	        res

	        	.status(200)
	        	res.cookie('jwt', token)
	        	.send({ user });
	    }
	})(req,res,next)
}


exports.post = function (data) {
	console.log(data)
	return new Promise((resolve, reject) => {
		data.email = data.email.toLowerCase()
		let user = Object.assign({},data)
		
		delete user.password
		console.log('password adter delete', user.password, data.password)
		User.register(new User(user), data.password, function (err, user) {
			console.log('saving ')
			if (err) {
				console.log(err)
			  reject('Email already in use')
			} else {
			 	resolve(user)
			}
		});
	})
}



exports.get = function (data) {
	return new Promise((resolve, reject) => {
	    User.find(data, function (err, users) {
	        if (err) {
	        	reject('Could not find user')
	        } else {
	        	resolve(users)
	        }
	    });
	})
};

exports.put = function (req, res) {
	return new Promise((resolve, reject) => {
	    User.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, user) {
	        if (err) {
	        	reject("There was a problem updating the user.");
	        } else {
	        	resolve(user)
	        }
	    });
   	})
};

exports.delete = function (id) {
	return new Promise((resolve, reject) => {
		if (id === 'ALL'){
			User.deleteMany({}, function (err, user) {
		        if (err) {
		        	reject("There was a problem deleting the users.");
		        } else {
		        	resolve("All users were deleted");
		        }
	    	});
		} else {
			User.deleteOne({id: id}, function (err, user) {
		        if (err) {
		        	reject("There was a problem deleting the user.");
		        } else {
		        	resolve("User "+ user.name +" was deleted.");
		        }
		        
		    });
		}
	})
	
};