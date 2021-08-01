/** @format */
/** @format */

const mongoose = require('mongoose');
const PurchaseSchema = new mongoose.Schema({
	description: {
		type: [String],
		required: [true, 'please enter the product code'],
		unique: true,
	},
	created_at: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('purchase', PurchaseSchema);
