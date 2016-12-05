var mongoose = require('mongoose');

module.exports = mongoose.model('Todo', {
	text : String,
	email : String,
	time : Date,
	done : Boolean
});