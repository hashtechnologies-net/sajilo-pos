const mongoose = require('mongoose');
const businessInfoSchema = new mongoose.Schema(
	{
		business_name: {
			type: String,
			required: [true, 'Please add the business name'],
		},

		phone: {
			type: Number,
			required: [true, 'Please add your business contact number'],
			minlength: [10, 'A phone number cannot be less than 10'],
		},

		address: {
			type: String,
			required: [true, 'Please add an address'],
		},
		additional_address: {
			type: String,
		},
		logo: {
			type: String,
			default: 'no_logo.png',
		},
	},
	{ timestamps: true },
);

module.exports = mongoose.model('businessInfo', businessInfoSchema);
