const mongoose = require('mongoose');
const InvoiceSchema = new mongoose.Schema({
	total_amount: {
		type: Number,
		required: true,
		$sum: { $multiply: ['$unit_price', '$quantity'] },
	},
	tendered_amount: {
		type: Number,
		required: true,
	},
	date: {
		type: Date,
		required: true,
	},
	quantity: {
		type: Number,
		required: true,
	},
	product_id: {
		type: mongoose.Schema.ObjectId,
		ref: 'Products',
		required: true,
	},
	user_id: {
		type: mongoose.Schema.ObjectId,
		ref: 'Users',
		required: true,
	},
	payment_id: {
		type: mongoose.Schema.ObjectId,
		ref: 'Payment',
		required: true,
	},
});

module.exports = mongoose.model('Invoice', InvoiceSchema);
