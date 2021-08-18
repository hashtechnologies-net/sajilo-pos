/** @format */

const path = require('path');
const multer = require('multer');
//Decalring the storage
var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './public/uploads');
	},
	filename: function (req, file, cb) {
		//Extracting the file extension
		let ext = path.extname(file.originalname);
		cb(null, Date.now() + ext);
	},
});

var upload = multer({
	storage: storage,
	fileFilter: function (req, file, callback) {
		//Checking for the MimeType
		if (file.mimetype === 'image.png' || 'image.jpg') {
			callback(null, true);
		} else {
			console.log('Please enter the correct file format');
			callback(null, false);
		}
	},
	limits: {
		fileSize: 1024 * 1024 * 10,
	},
});

module.exports = upload;
