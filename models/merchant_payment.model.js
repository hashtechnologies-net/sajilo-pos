const mongoose = require('mongoose');
const ProductCategorySchema = new mongoose.Schema({
	merchant_id: {
		type: mongoose.Schema.ObjectId,
		ref: 'merchant',
		require: true,
	},
	amount: {
		type: Number,
		required: [true, 'Please add the amount'],
	},
	paymentType: {
		type: String,
		enum: ['Cash', 'Bank'],
		required: [true, 'Please select the payment method'],
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
});

module.exports = mongoose.model('ProductCategory', ProductCategorySchema);
