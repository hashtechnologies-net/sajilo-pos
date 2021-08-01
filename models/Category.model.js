/** @format */

const mongoose = require('mongoose');
const CategorySchema = new mongoose.Schema({
	category_name: {
		type: String,
		unique: true,
		required: [true, 'Please add a category_name'],
		maxlength: [50, 'name cannot be more than of 30 characters'],
	},
	created_by: {
		type: mongoose.Schema.ObjectId,
		ref: 'admin',
		required: true,
	},
	created_at: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('category', CategorySchema);
