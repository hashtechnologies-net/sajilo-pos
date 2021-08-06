/** @format */

const mongoose = require('mongoose');
const InvoiceSchema = new mongoose.Schema({
	total_amount: {
		type: Number,
		required: true,
	},
	created_at: {
		type: Date,
		default: Date.now,
	},
	description: [
		{
			product: {
				type: mongoose.Schema.ObjectId,
				ref: 'product',
				required: true,
			},
			stock: {
				type: Number,
				required: [true, 'Please add the stock number'],
			},
		},
	],
	created_by: {
		type: mongoose.Schema.ObjectId,
		ref: 'user',
		required: true,
	},
});
module.exports = mongoose.model('invoice', InvoiceSchema);
