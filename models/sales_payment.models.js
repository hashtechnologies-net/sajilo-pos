const mongoose = require('mongoose');
const PaymentSchema = new mongoose.Schema({
	paymentType: {
		type: String,
		enum: ['Cash', 'Bank'],
		required: true,
	},
	Created_at: {
		type: Date,
		default: Date.now,
	},
	cash: {
		type: Number,
	},
	Bank: {
		type: Number,
	},
	credit: {
		type: Number,
	},
	invoice_id: {
		type: mongoose.Schema.ObjectId,
		ref: 'User',
		required: true,
	},
});

module.exports = mongoose.model('payment', PaymentSchema);
