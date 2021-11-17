/** @format */

const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema(
	{
		product_name: {
			type: String,
			required: [true, 'Please add a name'],
			trim: true,
			maxlength: [50, 'Name cannot be more than of 50 characters'],
		},
		product_code: {
			type: String,
			required: [true, 'Please enter the product code'],
			unique: true,
		},
		unit_id: {
			type: mongoose.Schema.ObjectId,
			ref: 'units',
			required: true,
		},

		unit_price: {
			type: Number,
			required: true,
		},
		product_status: {
			type: Boolean,
			default: false,
		},
		description: {
			type: String,
		},
		QR_link: {
			type: String,
			default: 'no_img.jpg',
		},
		category_id: {
			type: mongoose.Schema.ObjectId,
			ref: 'category',
			required: true,
		},
		created_by: {
			type: mongoose.Schema.ObjectId,
			required: true,
		},
	},
	{
		timestamps: true,
	},
);

module.exports = mongoose.model('product', ProductSchema);
