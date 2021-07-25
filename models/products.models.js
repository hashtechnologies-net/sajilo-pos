const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
	product_name: {
		type: String,
		required: [true, 'Please add a name'],
		trim: true,
		maxlength: [50, 'name cannot be more than of 50 characters'],
	},
	product_code: {
		type: String,
		required: [true, 'please enter the product code'],
		unique: true,
	},

	unit_price: {
		type: Number,
		required: true,
	},
	user_id: {
		type: mongoose.Schema.ObjectId,
		ref: 'User',
		required: true,
	},
});

module.exports = mongoose.model('Products', ProductSchema);
