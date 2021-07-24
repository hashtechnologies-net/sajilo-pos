const mongoose = require('mongoose');
const PaymentSchema = new mongoose.Schema({
	payamount: {
		type: Number,
		required: [true, 'Please add a name'],
	},
	paymenttype: {
		type: String,
		enum: [
			'Cash',
			'Debit cards',
			'Credit cards',
			'Mobile payments',
			'Electronic bank transfers',
		],
		required: true,
	},
	paymentdate: {
		type: Date,
	},
	user_id: {
		type: mongoose.Schema.ObjectId,
		ref: 'User',
		required: true,
	},
});

module.exports = mongoose.model('payment', PaymentSchema);
