const bcrypt = require('bcryptjs');

const mongoose = require('mongoose');
const usersSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: [true, 'Please add the first name'],
	},
	lastName: {
		type: String,
		required: [true, 'Please add the last name'],
	},
	email: {
		type: String,
		required: [true, 'please add email'],
		unique: [true, 'Email already registered'],
		match: [
			/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
			'Please enter a valid email',
		],
	},
	password: {
		type: String,
		required: [true, 'please add a password'],
		minlength: 6,
		select: false,
	},
	gender: {
		type: String,
		required: [true, 'Please enter your gender'],
		enum: ['Male', 'Female', 'Others'],
	},
	dob: {
		type: Date,
		required: [true, 'enter the date of birth in the format YY-MM-DD'],
	},
	address: {
		type: String,
		required: [true, 'Please add an address'],
	},
	accountType: {
		type: String,
		required: true,
		enum: ['Customer', 'Merchant', 'Admin'],
		default: 'Customer',
	},
});

usersSchema.pre('save', async function (next) {
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model('User', usersSchema);
