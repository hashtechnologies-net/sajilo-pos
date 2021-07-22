const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
	product_name: {
		type: String,
		required: [true, 'Please add a name'],
		maxlength: [50, 'name cannot be more than of 50 characters'],
	},
	Price: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model('Products', ProductSchema);
