/** @format */

const mongoose = require('mongoose');
const CategorySchema = new mongoose.Schema({
	Category_name: {
		type: String,
		required: [true, 'Please add a name'],
		maxlength: [50, 'name cannot be more than of 30 characters'],
	},
	created_at: {
		type: Date,
		default: Date.now,
	},
	created_by: {
		type: mongoose.Schema.ObjectId,
		ref: 'User',
		required: true,
	},
});

module.exports = mongoose.model('Category', CategorySchema);
