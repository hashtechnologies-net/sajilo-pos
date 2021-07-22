const mongoose = require('mongoose');
const BrandSchema = new mongoose.Schema({
	Brand_name: {
		type: String,
		required: [true, 'Please add a name'],
		maxlength: [50, 'name cannot be more than of 30 characters'],
	},
	Product_id: {
		type: mongoose.Schema.ObjectId,
		ref: 'product.model',
		required: true,
	},
});

module.exports = mongoose.model('BrandName', BrandSchema);
