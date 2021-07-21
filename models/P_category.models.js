const mongoose = require('mongoose');
const P_categorySchema = new mongoose.Schema({
	product_C_name: {
		type: String,
		required: [true, 'Please add a name'],
		maxlength: [50, 'name cannot be more than of 30 characters'],
	},
	Product_code_id: {
		type: String,
		required: true,
	},
	Product_id: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model('ProductCategory', P_categorySchema);
