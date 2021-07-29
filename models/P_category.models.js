const mongoose = require('mongoose');
const ProductCategorySchema = new mongoose.Schema({
	productCatName: {
		type: String,
		required: [true, 'Please add a name'],
		maxlength: [30, 'name cannot be more than of 30 characters'],
	},
	product_id: {
		type: mongoose.Schema.ObjectId,
		ref: 'Products',
		required: true,
	},
});

module.exports = mongoose.model('ProductCategory', ProductCategorySchema);
