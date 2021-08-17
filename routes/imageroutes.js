const express = require('express');
const imageController = require('../controller/imagecontroller');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
	dest: './upload/images',
});

const upload = multer({
	storage: storage,
	limits: {
		fileSize: 10,
	},
});

router.route('/').post(upload.single('photo'), imageController.photoUpload);

module.exports = router;
