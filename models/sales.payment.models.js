/** @format */

const mongoose = require('mongoose');
const salesPaymentSchema = new mongoose.Schema({
	paymentType: {
		type: String,
		enum: ['Cash', 'Bank'],
		required: true,
	},
	created_at: {
		type: Date,
		default: Date.now,
	},
	cash: {
		type: Number,
	},
	bank: {
		type: Number,
	},
	credit: {
		type: Number,
	},
	invoice_id: {
		type: mongoose.Schema.ObjectId,
		ref: 'invoice',
		required: true,
	},
	// created_by: {
	// 	type: mongoose.Schema.ObjectId,
	// 	ref: 'invoice',
	// 	required: true,
	// },
});

module.exports = mongoose.model('salesPayment', salesPaymentSchema);
