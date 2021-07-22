const mongoose = require('mongoose');
const usersSchema = new mongoose.Schema({
	U_fname: {
		type: String,
		required: [true, 'Please add the first name'],
		trim: true,
		maxlength: [30, 'name cannot be more than of 30 characters'],
	},
	U_lname: {
		type: String,
		required: [true, 'Please add the last name'],
		trim: true,
		maxlength: [30, 'name cannot be more than of 30 characters'],
	},
	U_email: {
		type: String,
		match: [
			/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
			'Please enter a valid email',
		],
	},
	U_gender: {
		type: [String],
		required: true,
		enum: ['Male', 'Female', 'Others'],
	},

	U_DOB: {
		type: Date,
		required: true,
		trim: true,
	},

	U_address: {
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
