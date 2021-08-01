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
	sales_id: {
		type: mongoose.Schema.ObjectId,
		ref: 'sales',
		required: true,
	},
	user_id: {
		type: mongoose.Schema.ObjectId,
		ref: 'user',
		required: true,
	},
	counter_name: {
		type: String,
	},
});
module.exports = mongoose.model('invoice', InvoiceSchema);
