const mongoose = require('mongoose');
const StockEntrySchema = new mongoose.Schema({
	stockIn: {
		type: Number,
		required: true,
	},
	stockOut: {
		type: Number,
		required: true,
	},
	product_id: {
		type: mongoose.Schema.ObjectId,
		ref: 'product',
		required: true,
	},
	purchase_id: {
		type: mongoose.Schema.ObjectId,
		ref: 'purchase',
		required: true,
	},
	invoice_id: {
		type: mongoose.Schema.ObjectId,
		ref: 'invoice',
		required: true,
	},
});
module.exports = mongoose.model('stockentry', StockEntrySchema);
