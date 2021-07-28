const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const mongoose = require('mongoose');
const usersSchema = new mongoose.Schema({
	Name: {
		type: String,
		required: [true, 'Please add the Name'],
	},
	photo: {
		type: String,
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
		enum: ['Male', 'Female', 'Others'],
	},
	dob: {
		type: Date,
	},
	address: {
		type: String,
	},
	accountType: {
		type: String,
		enum: ['Customer', 'Merchant', 'Admin'],
		default: 'Customer',
	},
});

usersSchema.pre('save', async function (next) {
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});

// Sign JWT and return
usersSchema.methods.getSignedJwtToken = function () {
	return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRE,
	});
};
module.exports = mongoose.model('User', usersSchema);
