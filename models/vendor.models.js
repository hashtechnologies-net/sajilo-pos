const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const mongoose = require('mongoose');
const vendorSchema = new mongoose.Schema({
	vendorName: {
		type: String,
		required: [true, 'Please add the Name'],
	},
	phoneNumber: {
		type: Number,
		minlength: [10, 'phone number sould have 10 digits'],
		required: [true, 'Please add the phoneNumber'],
	},
	email: {
		type: String,
		required: [true, 'Please add email'],
		unique: [true, 'Email has already been registered'],
		match: [
			/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
			'Please enter a valid email',
		],
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

vendorSchema.pre('save', async function (next) {
	try {
		const salt = await bcrypt.genSalt(10);
		this.password = await bcrypt.hash(this.password, salt);
	} catch (error) {
		res.Status(400).json({ error });
	}
});

// Sign JWT and return
vendorSchema.methods.getSignedJwtToken = function () {
	return jwt.sign({ id: this._id }, process.env.JWT_VENDOR_SECRET, {
		expiresIn: process.env.JWT_EXPIRE,
	});
};

// Match vendor entered password to hashed password in database
vendorSchema.methods.matchPassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password);
};

// Generate and hash password token
vendorSchema.methods.getResetPasswordToken = function () {
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

module.exports = mongoose.model('vendor', vendorSchema);
