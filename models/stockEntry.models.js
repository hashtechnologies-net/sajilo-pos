const mongoose = require('mongoose');
const StockEntrySchema = new mongoose.Schema({
	stockIn: {
		type: Number,
	},
	stockOut: {
		type: Number,
	},
	product_id: {
		type: mongoose.Schema.ObjectId,
		ref: 'product',
		required: true,
	},
	purchase_id: {
		type: mongoose.Schema.ObjectId,
		ref: 'purchase',
	},
	invoice_id: {
		type: mongoose.Schema.ObjectId,
		ref: 'invoice',
	},
});
module.exports = mongoose.model('stockentry', StockEntrySchema);
