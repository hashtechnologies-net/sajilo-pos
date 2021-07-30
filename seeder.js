/** @format */

const fs = require('fs');
const mongoose = require('mongoose');
require('dotenv').config();
const asyncHandler = require('./middleware/async');

// Load models
const Products = require('./models/product.models');
const User = require('./models/users.models');

// Connect to DB
mongoose.connect(process.env.LOCAL_DB, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: false,
	useUnifiedTopology: true,
});

// Read JSON files
const users = JSON.parse(
	fs.readFileSync(`${__dirname}/data/users.json`, 'utf-8')
);

const products = JSON.parse(
	fs.readFileSync(`${__dirname}/data/products.json`, 'utf-8')
);

// Import into DB
const importData = asyncHandler(async () => {
	await User.create(users);
	await Products.create(products);
	console.log('Data Imported...');
	process.exit();
});

// Delete data
const deleteData = asyncHandler(async () => {
	await User.deleteMany();
	await Products.deleteMany();
	console.log('Data Destroyed...');
	process.exit();
});

if (process.argv[2] === '-i') {
	importData();
} else if (process.argv[2] === '-d') {
	deleteData();
}
