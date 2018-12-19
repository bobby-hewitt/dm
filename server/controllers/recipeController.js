var Recipe = require('../models/Recipe');
const passport = require('passport')
const jwt = require('jsonwebtoken')



exports.post = function (data) {
	return new Promise((resolve, reject) => {
		Recipe.create(data, function (err, recipe) {
		  if (err) return reject('error saving Recipe');
		  else return resolve('success adding Recipe')
		})
	})
}

exports.get = function (data) {
	return new Promise((resolve, reject) => {
	    Recipe.find(data, function (err, recipes) {
	        if (err) {
	        	reject('Could not find Recipes')
	        } else {
	        	resolve(recipes)
	        }
	    });
	})
};

exports.put = function (data) {
	return new Promise((resolve, reject) => {
	    Recipe.findOneAndUpdate({_id: data._id}, data, {new: true}, function (err, recipe) {
	        if (err) {
	        	reject("There was a problem updating the Recipe.");
	        } else {
	        	findAndReturnRecipes()
		        	.then(data => resolve(data))
		        	.catch(err => reject(err))
	        }
	    });
   	})
};


function findAndReturnRecipes(){
	return new Promise((resolve, reject) => {
		Recipe.find({}, function(err, recipes){
			if (err){
				reject('Could not get Recipes')
			} else {
				resolve(recipes)
			}
		})
	})
	
}

exports.delete = function (id) {
	return new Promise((resolve, reject) => {
		if (id === 'ALL'){
			Recipe.deleteMany({}, function (err, recipe) {
		        if (err) {
		        	reject("There was a problem deleting the Recipes.");
		        } else {
		        	resolve("All Recipes were deleted");
		        }
	    	});
		} else {
			Recipe.deleteOne({_id: id}, function (err, recipe) {
		        if (err) {
		        	reject("There was a problem deleting the Recipe.");
		        } else {
		        	findAndReturnRecipes()
		        	.then(data => resolve(data))
		        	.catch(err => reject(err))
		        }
		        
		    });
		}
	})
	
};