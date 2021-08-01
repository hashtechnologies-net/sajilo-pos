/** @format */

const mongoose = require('mongoose');
const UnitSchema = new mongoose.Schema({
	unit_name: {
		type: String,
		unique: true,
		required: [true, 'Please enter the unit name'],
	},
	created_by: {
		type: mongoose.Schema.ObjectId,
		ref: 'admin',
		required: true,
	},

	created_at: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('units', UnitSchema);
