/** @format */

const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
	product_name: {
		type: String,
		required: [true, 'Please add a name'],
		trim: true,
		unique: true,
		maxlength: [50, 'name cannot be more than of 50 characters'],
	},
	product_code: {
		type: String,
		required: [true, 'please enter the product code'],
		unique: true,
	},
	// unit: {
	// 	type: mongoose.Schema.ObjectId,
	// 	ref: 'Unit',
	// 	required: true,
	// },
	unit_price: {
		type: Number,
		required: true,
	},
	product_status: {
		type: Boolean,
		default: false,
	},
	category_id: {
		type: mongoose.Schema.ObjectId,
		ref: 'Category',
		required: true,
	},
	created_by: {
		type: mongoose.Schema.ObjectId,
		ref: 'Admin',
		required: true,
	},
	created_at: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('product', ProductSchema);
