var Product = require('../models/product');


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
	    	console.log(products)
	        if (err) {
	        	reject('Could not find products')
	        } else {
	        	resolve(products)
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