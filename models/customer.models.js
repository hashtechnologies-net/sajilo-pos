/** @format */
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const mongoose = require('mongoose');
const customersSchema = new mongoose.Schema({
	customer_fname: {
		type: String,
		required: [true, 'Please add your full Name'],
	},
	customer_lname: {
		type: String,
		required: [true, 'Please add your full Name'],
	},
	customer_username: {
		type: String,
		required: true,
		unique: true,
	},
	customer_email: {
		type: String,
		required: [true, 'Please add email'],
		unique: [true, 'Email has already been registered'],
		match: [
			/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
			'Please enter a valid email',
		],
	},
	phone: {
		type: Number,
		required: [true, 'Please add a number'],
	},
	address: {
		type: String,
		required: [true, 'Please add an address'],
	},
	password: {
		type: String,
		required: [true, 'Please add a password'],
		minlength: 6,
		select: false,
	},
	resetPasswordToken: String,
	resetPasswordExpire: Date,
	created_at: {
		type: Date,
		default: Date.now,
	},
});

customersSchema.pre('save', async function (next) {
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});

// Sign JWT and return
customersSchema.methods.getSignedJwtToken = function () {
	return jwt.sign({ id: this._id }, process.env.JWT_CUSTOMER_SECRET, {
		expiresIn: process.env.JWT_EXPIRE,
	});
};

// Match user entered password to hashed password in database
customersSchema.methods.matchPassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password);
};

// Generate and hash password token
customersSchema.methods.getResetPasswordToken = function () {
	// Generate token
	const resetToken = crypto.randomBytes(20).toString('hex');

	// Hash token and set to resetPasswordToken field
	this.resetPasswordToken = crypto
		.createHash('sha256')
		.update(resetToken)
		.digest('hex');

	// Set expire
	this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

	return resetToken;
};

module.exports = mongoose.model('customer', customersSchema);
