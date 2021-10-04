/** @format */

const mongoose = require('mongoose');
const AppsettingSchema = new mongoose.Schema({
	business_name: {
		type: String,
		required: [true, 'Please add a business name'],
		trim: true,
		unique: true,
		maxlength: [50, 'Name cannot be more than 50 characters'],
	},
	installed: {
		type: Boolean,
		default: false,
	},
	contact: {
		type: Number,
		minlength: [10, 'A number should be of 10 digits'],
		maxlength: [10, 'A number should be of only 10 digits'],
		required: true,
	},
	logo_url: {
		type: String,
		required: true,
	},
	address: {
		type: String,
		required: [true, 'Please add the address'],
		maxlength: [30, 'Address cannot be more than 30 characters'],
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

module.exports = mongoose.model('appsetting', AppsettingSchema);
