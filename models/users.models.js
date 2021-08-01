/** @format */

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
	Status: {
		type: Boolean,
	},
	created_at: {
		type: Date,
		default: Date.now,
	},
});

usersSchema.pre('save', async function (next) {
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});

// Sign JWT and return
usersSchema.methods.getSignedJwtToken = function () {
	return jwt.sign({ id: this._id }, process.env.JWT_USER_SECRET, {
		expiresIn: process.env.JWT_EXPIRE,
	});
};
module.exports = mongoose.model('user', usersSchema);
