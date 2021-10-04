/** @format */

const mongoose = require('mongoose');
const ProductMetadataSchema = new mongoose.Schema({
	discount: {
		type: Number,
	},

	description: {
		type: String,
	},

	return_condition: {
		type: String,
	},
	warranty: {
		type: Boolean,
		default: false,
	},
	warranty_duration: {
		type: Number,
	},
	terms_and_condition: {
		type: String,
	},
	created_by: {
		type: mongoose.Schema.ObjectId,
		ref: 'admin',
		required: true,
	},
	created_at: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('productMetadata', ProductMetadataSchema);
