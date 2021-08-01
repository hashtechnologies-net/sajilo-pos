const mongoose = require('mongoose');
const salesPaymentSchema = new mongoose.Schema({
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
		ref: 'user',
		required: true,
	},
});

module.exports = mongoose.model('salesPayment', salesPaymentSchema);
