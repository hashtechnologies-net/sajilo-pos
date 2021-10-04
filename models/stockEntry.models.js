/** @format */

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
	order_id: {
		type: mongoose.Schema.ObjectId,
		ref: 'order',
	},
	invoice_id: {
		type: mongoose.Schema.ObjectId,
		ref: 'invoice',
	},
}, {timestamps:true});
module.exports = mongoose.model('stockentry', StockEntrySchema);
