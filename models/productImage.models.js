/** @format */

const mongoose = require('mongoose');
const PaymentSchema = new mongoose.Schema({
	product_id: {
		type: mongoose.Schema.ObjectId,
		ref: 'product',
		required: true,
	},
	created_by: {
		type: mongoose.Schema.ObjectId,
		ref: 'merchant',
		required: true,
	},
	image_url: {
		type: String,
		required: [true, 'Image should be there'],
	},
});
