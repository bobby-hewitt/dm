module.exports = function(req){
	console.log('loogin for jwt')
	if (req && req.cookies ){
		//search for jwt
		console.log('cookies', req.cookies)
		// return req.headers.jwt.toString()
	} else {
		return ''
	}
}