const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
	product_name: {
		type: String,
		required: [true, 'Please add a name'],
		maxlength: [50, 'name cannot be more than of 30 characters'],
	},
	Product_code: {
		type: String,
		required: true,
	},
	Product_id: {
		type: String,
		required: true,
	},
	Brand_id: {
		type: String,
		required: true,
	},
	Price: {
		type: String,
		required: true,
	},
	Product_code_id: {
		type: String,
		required: true,
	},
	Stock_id: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model('Products', ProductSchema);
