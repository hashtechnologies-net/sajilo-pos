const mongoose = require('mongoose');
const usersSchema = new mongoose.Schema({
	first_name: {
		type: String,
		required: [true, 'Please add the first name'],
		trim: true,
		maxlength: [30, 'first name cannot be more than of 30 characters'],
	},
	last_name: {
		type: String,
		required: [true, 'Please add the last name'],
		trim: true,
		maxlength: [30, 'last name cannot be more than of 30 characters'],
	},
	email: {
		type: String,
		match: [
			/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
			'Please enter a valid email',
		],
	},
	gender: {
		type: [String],
		required: true,
		enum: ['Male', 'Female', 'Others'],
	},

	dob: {
		type: Date,
		required: true,
		trim: true,
	},

	address: {
		formattedAddress: String,
		street: String,
		wardNo: Number,
		city: String,
		district: String,
		required: true,
	},
	account_type: {
		type: [String],
		required: true,
		enum: ['Customer', 'Merchant', 'Admin'],
	},
});

module.exports = mongoose.model('Users', usersSchema);
