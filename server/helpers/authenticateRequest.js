var passport = require('passport');

module.exports = function(req,res,next){
	return new Promise ((resolve, reject) => {
	// 	console.log('AUTHENTICATING')
		passport.authenticate('jwt', function (err, user, info) {
		    if (err) {
		    	console.log('err', err)
		      	reject({error: err})
		      	// res.status(403).send('Error finding user')
		    }
		    if (!user) {
		    	console.log('no user found')
		    	// res.status(403).send('No user')
		     	reject({ error: 'Invalid credentials.' });
		    }
		    if (user) {
		    	console.log('user found')
		     	resolve(user)
		    }
  		})(req, res, next);
	});
}