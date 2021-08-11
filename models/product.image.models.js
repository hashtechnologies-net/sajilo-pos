/** @format */

const mongoose = require('mongoose');
const productImageSchema = new mongoose.Schema({
	imageUrl: {
		type: [String],
		required: [true, 'Please add the images'],
	},
	created_at: {
		type: Date,
		default: Date.now,
	},
	product: {
		type: mongoose.Schema.ObjectId,
		ref: 'product',
		required: true,
	},
});

module.exports = mongoose.model('productImage', productImageSchema);
