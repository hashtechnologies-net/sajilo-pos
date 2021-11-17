/** @format */

const mongoose = require('mongoose');
const AppsettingSchema = new mongoose.Schema(
	{
		business: {
			type: mongoose.Schema.ObjectId,
			ref: 'businessInfo',
			required: true,
		},
		installed: {
			type: Boolean,
			default: false,
		}
	},
	{
		timestamps: true,
	},
);

module.exports = mongoose.model('appsetting', AppsettingSchema);
