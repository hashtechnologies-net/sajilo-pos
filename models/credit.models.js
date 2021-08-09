/** @format */

const mongoose = require('mongoose');
const creditSchema = new mongoose.Schema(
	{
		merchant_id: {
			type: mongoose.Schema.ObjectId,
			ref: 'merchant',
			require: true,
		},
		paymentType: {
			type: String,
			enum: ['Cash', 'Bank'],
			required: [true, 'Please select the payment method'],
		},
		cash: {
			type: Number,
		},
		bank: {
			type: Number,
		},
		paymentconfirmId: {
			type: String,
		},
		credit: {
			type: Number,
		},
		created_by: {
			type: mongoose.Schema.ObjectId,
			ref: 'admin',
			required: true,
		},
		payment_id: {
			type: mongoose.Schema.ObjectId,
			ref: 'merchantPayment',
			required: true,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('credits', creditSchema);
