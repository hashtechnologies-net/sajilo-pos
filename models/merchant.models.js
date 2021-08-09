/** @format */

const mongoose = require('mongoose');
const merchantSchema = new mongoose.Schema({
	merchantName: {
		type: String,
		required: [true, 'Please add the Name'],
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

module.exports = mongoose.model('merchant', merchantSchema);
