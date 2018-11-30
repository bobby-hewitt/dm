var passport = require('passport');

module.exports = function(req,res,next){
	console.log(req.cookies)
	if (!req.cookies ){
		next('NOT_AUTHORISED')
	} else if (!req.cookies.jwt){
		next('NOT_AUTHORISED')
	} else {
		next('READY TO AUTHORISE')
	}



	// return new Promise ((resolve, reject) => {
	// 	console.log('AUTHENTICATING')
	// 	passport.authenticate('jwt', function (err, user, info) {
	// 	    if (err) {
	// 	    	console.log('err', err)
	// 	      	reject({error: err})
	// 	    }
	// 	    if (!user) {
	// 	    	console.log('no user found')
	// 	     	reject({ error: 'Invalid credentials.' });
	// 	    }
	// 	    if (user) {
	// 	     	resolve(user)
	// 	    }
 //  		})(req, res, next);
	// });
}