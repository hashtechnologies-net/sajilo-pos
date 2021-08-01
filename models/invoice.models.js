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
	description: {
		type: [],
		required: true,
	},
	user_id: {
		type: mongoose.Schema.ObjectId,
		ref: 'user',
		required: true,
	},
});
module.exports = mongoose.model('invoice', InvoiceSchema);
