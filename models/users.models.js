/** @format */
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const mongoose = require('mongoose');
const usersSchema = new mongoose.Schema({
	full_name: {
		type: String,
		required: [true, 'Please add the Name'],
	},
	username: {
		type: String,
		required: true,
		unique: true,
	},
	photo: {
		type: String,
		default: 'photo.jpg',
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
	Status: {
		type: Boolean,
	},
	created_at: {
		type: Date,
		default: Date.now,
	},
	created_by: {
		type: mongoose.Schema.ObjectId,
		ref: 'admin',
		required: true,
	},
});

usersSchema.pre('save', async function (next) {
	// try {
	// 	if (this.isModified('password')) {
	// 		next();
	// 	}
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
	// } catch (error) {
	// 	res.Status(400).json({ error });
	//}
});

// Sign JWT and return
usersSchema.methods.getSignedJwtToken = function () {
	return jwt.sign({ id: this._id }, process.env.JWT_USER_SECRET, {
		expiresIn: process.env.JWT_EXPIRE,
	});
};

// Match user entered password to hashed password in database
usersSchema.methods.matchPassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password);
};

// Generate and hash password token
usersSchema.methods.getResetPasswordToken = function () {
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

module.exports = mongoose.model('user', usersSchema);
