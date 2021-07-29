const mongoose = require('mongoose');
require('dotenv').config();

const DB = process.env.LOCAL_DB;

const connectDB = async () => {
	await mongoose.connect(DB, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false,
		useUnifiedTopology: true,
	});

	console.log(`MongoDB connected....`);
};

module.exports = connectDB;
