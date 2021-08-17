const mongoose = require('mongoose');
const ImageSchema = new mongoose.Schema({
	photo: {
		type: String,
	},
});
module.exports = mongoose.model('productimage', ImageSchema);
