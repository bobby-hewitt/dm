var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Product = new Schema({
	title: String,
	body: String,
	image: String,
	image: String,
	price: String
});
 
var Product = module.exports = mongoose.model('Product', Product);