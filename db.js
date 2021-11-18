const mongoose = require('mongoose');
require('dotenv').config();



const connectDB = async (DB) => {
	await Promise.all([
		closeDB(),
		OpenDB(DB)
	])
	
};

const closeDB = async () => {
	if (mongoose.connection.readyState === 1) {
		await mongoose.connection.close(function () {
			console.log('Mongoose disconnected on app switch');
		  });
	}
	
}

const OpenDB = async (DB) => {
	await mongoose.connect(DB, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false,
		useUnifiedTopology: true,
		poolSize: 10,
	});

	console.log(`MongoDB connected....`);
}

module.exports = connectDB;


