var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Blog = new Schema({
	title: String,
	body: String,
	date: String
});
 
var Blog = module.exports = mongoose.model('Blog', Blog);