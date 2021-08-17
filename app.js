//const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const morgan = require('morgan');
const fileupload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const errorHandler = require('./middleware/error');
const mongoSanitize = require('express-mongo-sanitize');
const connectDB = require('./db');
const mongoose = require('mongoose');
const Pusher = require('pusher');
const multer = require('multer');

//pusher setup
const db = mongoose.connection;
db.once('open', () => {
	console.log('db is connected');
	const messages = db.collection('products');
	const changeStream = messages.watch();

	changeStream.on('change', (change) => {
		if (change.operationType === 'insert') {
			const details = change.fullDocument;
			pusher.trigger('products', 'inserted', {
				sender: details.sender,
				message: details.message,
				timestamp: details.timestamp,
				status: 0,
				threadId: details.threadId,
			});
		} else {
			console.log('error on pusher');
		}
	});
});

const pusher = new Pusher({
	appId: '1202226',
	key: '2142cda6d39765cba2a9',
	secret: '93c2b88777c4c5d29975',
	cluster: 'ap2',
	useTLS: true,
});

//connect database
connectDB();

// Body parser
app.use(express.json());

//cookie parser
app.use(cookieParser());

//use fileupload
app.use(fileupload());

//Sanitize data
app.use(mongoSanitize());

app.use(morgan('dev'));

// Route files
const userRouter = require('./routes/users.routes');
const productRouter = require('./routes/product.routes');
const authRouter = require('./routes/auth.routes');
const categoryRouter = require('./routes/category.routes');
const unitRouter = require('./routes/unit.routes');
const adminRouter = require('./routes/admin.routes');
const merchantRouter = require('./routes/merchant.routes');
const invoiceRouter = require('./routes/invoice.routes');
const purchaseRouter = require('./routes/purchase.routes');
const sPaymentRouter = require('./routes/salesPayment.routes');
const mPaymentRouter = require('./routes/merchantPayment.routes');
const queryRouter = require('./routes/query.routes');
const stockRouter = require('./routes/stock.routes');
const vendorRouter = require('./routes/vendor.routes');
const imageRouter = require('./routes/imageroutes');

// Mount routers
app.use('/api/v1/users', userRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/category', categoryRouter);
app.use('/api/v1/units', unitRouter);
app.use('/api/v1/admins', adminRouter);
app.use('/api/v1/merchants', merchantRouter);
app.use('/api/v1/invoices', invoiceRouter);
app.use('/api/v1/purchases', purchaseRouter);
app.use('/api/v1/salespayments', sPaymentRouter);
app.use('/api/v1/merchantpayments', mPaymentRouter);
app.use('/api/v1/find', queryRouter);
app.use('/api/v1/stocks', stockRouter);
app.use('/api/v1/vendors', vendorRouter);
app.use('/api/v1/vendors', vendorRouter);
app.use('/api/v1/uploads', imageRouter);

//mount errorhandler
app.use(errorHandler);

module.exports = app;
