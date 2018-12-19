var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Recipe = new Schema({
	title: String,
	image: String,
	body: String,
	date: String
});
 
var Recipe = module.exports = mongoose.model('Recipe', Recipe);