var Blog = require('../models/blog');
const passport = require('passport')
const jwt = require('jsonwebtoken')



exports.post = function (data) {
	return new Promise((resolve, reject) => {
		Blog.create(data, function (err, blog) {
		  if (err) return reject('error saving blog');
		  else return resolve('success adding blog')
		})
	})
}

exports.get = function (data) {
	return new Promise((resolve, reject) => {
	    Blog.find(data, function (err, blogs) {
	        if (err) {
	        	reject('Could not find blogs')
	        } else {
	        	resolve(blogs)
	        }
	    });
	})
};

exports.put = function (data) {
	return new Promise((resolve, reject) => {
	    Blog.findOneAndUpdate({_id: data._id}, data, {new: true}, function (err, blog) {
	        if (err) {
	        	reject("There was a problem updating the blog.");
	        } else {
	        	findAndReturnBlogs()
		        	.then(data => resolve(data))
		        	.catch(err => reject(err))
	        }
	    });
   	})
};


function findAndReturnBlogs(){
	return new Promise((resolve, reject) => {
		Blog.find({}, function(err, blogs){
			if (err){
				reject('Could not get blogs')
			} else {
				resolve(blogs)
			}
		})
	})
	
}

exports.delete = function (id) {
	return new Promise((resolve, reject) => {
		if (id === 'ALL'){
			Blog.deleteMany({}, function (err, blog) {
		        if (err) {
		        	reject("There was a problem deleting the blogs.");
		        } else {
		        	resolve("All blogs were deleted");
		        }
	    	});
		} else {
			Blog.deleteOne({_id: id}, function (err, blog) {
		        if (err) {
		        	reject("There was a problem deleting the blog.");
		        } else {
		        	findAndReturnBlogs()
		        	.then(data => resolve(data))
		        	.catch(err => reject(err))
		        }
		        
		    });
		}
	})
	
};