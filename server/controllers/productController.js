var Product = require('../models/product');
const RecipeController = require('./recipeController')
var mongoose = require('mongoose');

exports.post = function (data) {
	
	return new Promise((resolve, reject) => {
		Product.create(data, function (err, product) {
			console.log('created ',product)
		  if (err) return reject('error saving Product');
		  else return resolve('success adding Product')
		})
	})
}

exports.get = function (data) {
	return new Promise((resolve, reject) => {
	    Product.find(data, function (err, products) {
	    	
	        if (err) {
	        	reject('Could not find products',err)
	        } else {
	        	console.log('tpye', data._id)
	        	if (data && data._id && typeof data._id === 'string'){
	        		RecipeController.get({productIds: data._id})
	        		.then((recipes) => {
	        			let newProducts = Object.assign({recipes: recipes}, products[0]._doc)
	        			console.log(newProducts.recipes)
	        			let toSend = [newProducts]

	        			// newProducts[0].recipes = recipes
	        			// console.log(newProducts.recipes)
	        			// console.log(products)
	        			resolve(toSend)
	        		})
	        		.catch((err) => {
	        			console.log('error getting recipes for products')
	        		})
	        	}
	        	else {
	        		console.log('resolving without looking for recipes')
	        		resolve(products)
	        	}
	        	
	        }
	    });
	})
};

exports.put = function (data) {
	return new Promise((resolve, reject) => {
	    Product.findOneAndUpdate({_id: data._id}, data, {new: true}, function (err, product) {
	        if (err) {
	        	reject("There was a problem updating the Product.");
	        } else {
	        	findAndReturnProducts()
		        	.then(data => resolve(data))
		        	.catch(err => reject(err))
	        }
	    });
   	})
};


function findAndReturnProducts(){
	return new Promise((resolve, reject) => {
		Product.find({}, function(err, products){
			if (err){
				reject('Could not get products')
			} else {
				resolve(products)
			}
		})
	})
	
}

exports.delete = function (id) {
	return new Promise((resolve, reject) => {
		if (id === 'ALL'){
			Product.deleteMany({}, function (err, product) {
		        if (err) {
		        	reject("There was a problem deleting the Products.");
		        } else {
		        	resolve("All Products were deleted");
		        }
	    	});
		} else {
			Product.deleteOne({_id: id}, function (err, product) {
		        if (err) {
		        	reject("There was a problem deleting the Product.");
		        } else {
		        	findAndReturnProducts()
		        	.then(data => resolve(data))
		        	.catch(err => reject(err))
		        }
		        
		    });
		}
	})
	
};