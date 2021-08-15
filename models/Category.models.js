/** @format */

const mongoose = require('mongoose');
const CategorySchema = new mongoose.Schema({
	category_name: {
		type: String,
		unique: true,
		required: [true, 'Please add a category_name'],
		maxlength: [50, 'Name cannot be more than of 30 characters'],
	},
	created_by: {
		type: mongoose.Schema.ObjectId,
		ref: 'admin',
		required: true,
	},
	totalStock: {
		type: Number,
	},
	created_at: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('category', CategorySchema);

//Cascade deleting products when a category is deleted
CategorySchema.pre('remove', async function (next) {
	console.log('The products are being deleted');
	await this.model('product').deleteMany({ category_id: this._id });
	next();
});
