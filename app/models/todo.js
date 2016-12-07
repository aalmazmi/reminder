var mongoose = require('mongoose');

module.exports = mongoose.model('Post', {
	text : String,
	email : String,
	time : Date,
	done : Boolean
});