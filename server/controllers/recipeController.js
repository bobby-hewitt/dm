var Recipe = require('../models/Recipe');
const passport = require('passport')
const jwt = require('jsonwebtoken')
const ProductController = require('./productController')


exports.post = function (data) {
	return new Promise((resolve, reject) => {
		data.productIds = JSON.parse(data.productIds)
		Recipe.create(data, function (err, recipe) {
		  if (err) return reject('error saving Recipe');
		  else return resolve('success adding Recipe')
		})
	})
}

exports.get = function (data) {
	console.log('getting recipe,', data)
	return new Promise((resolve, reject) => {
	    Recipe.find(data, function (err, recipes) {
	        if (err) {
	        	reject('Could not find Recipes')
	        } else {
	        	console.log('found recipe')
	        	//if it is an individual recipe and it has products then look for products
	        	if (data && data._id && typeof data._id === 'string' && recipes[0].productIds && recipes[0].productIds.length > 4){
	        		console.log('recipe.productIds', recipes[0].productIds)
	        		ProductController.get({_id: { $in: [recipes[0].productIds]}})
	        		.then((products) => {
	        			console.log('success finding products for recipes')
	        			recipes[0].products = products
	        			resolve(recipes)
	        		})
	        		.catch((err) => {
	        			console.log(err)
	        			reject('error finding products for recipes', err)
	        		})
	        	} else {
	        		console.log('sending recipe without product')
	        		resolve(recipes)
	        	}

	        	
	        }
	    });
	})
};

exports.put = function (data) {
	return new Promise((resolve, reject) => {
		data.productIds = JSON.parse(data.productIds)
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