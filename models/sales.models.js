const mongoose = require('mongoose');
const PaymentSchema = new mongoose.Schema({
	product_id: {
		type: mongoose.Schema.ObjectId,
		ref: 'product',
		required: true,
	},
	stock_count: {
		type: Number,
	},
	user_id: {
		type: mongoose.Schema.ObjectId,
		ref: 'user',
		required: true,
	},
	customer: {
		type: String,
		default: 'Cash',
	},
});

module.exports = mongoose.model('sales', PaymentSchema);
