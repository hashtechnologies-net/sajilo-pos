/** @format */

const mongoose = require('mongoose');
const merchantPaymentSchema = new mongoose.Schema(
	{
		merchant_id: {
			type: mongoose.Schema.ObjectId,
			ref: 'merchant',
			require: true,
		},
		amount: {
			type: Number,
			required: [true, 'Please add the amount'],
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
	},
	{ timestamps: true }
);

module.exports = mongoose.model('merchantPayment', merchantPaymentSchema);
