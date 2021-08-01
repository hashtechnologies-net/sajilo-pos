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
});

module.exports = mongoose.model('merchant', merchantSchema);
