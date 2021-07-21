const mongoose = require('mongoose');
const BookSchema = new mongoose.Schema({
	title: {
		type: String,
		required: [true, 'Please add a name'],
		unique: true,
		trim: true,
		maxlength: [50, 'name cannot be more than of 30 characters'],
	},
	authors: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model('Book', BookSchema);
