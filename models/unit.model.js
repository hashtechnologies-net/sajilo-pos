/** @format */

const mongoose = require('mongoose');
const UnitSchema = new mongoose.Schema({
	unit: {
		type: String,
		enum: ['kg', 'litre'],
		default: 'kg',
		unique: true,
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

module.exports = mongoose.model('Unit', UnitSchema);
