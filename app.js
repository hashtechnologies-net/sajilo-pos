/** @format */

//const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const morgan = require('morgan');
const fileupload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const errorHandler = require('./middleware/error');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const connectDB = require('./db');

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

//Set Security Headers
app.use(helmet());

//Prevent XSS attacks
app.use(xss());

app.use(morgan('dev'));

// Route files
const userRouter = require('./routes/users.routes');
const productRouter = require('./routes/product.routes');
const authRouter = require('./routes/auth.routes');
const categoryRouter = require('./routes/category.routes');
const unitRouter = require('./routes/unit.routes');
const adminRouter = require('./routes/admin.routes');
const orderRouter = require('./routes/order.routes');
const customerRouter = require('./routes/customer.routes');
const merchantRouter = require('./routes/merchant.routes');
const invoiceRouter = require('./routes/invoice.routes');
const purchaseRouter = require('./routes/purchase.routes');
const sPaymentRouter = require('./routes/salesPayment.routes');
const mPaymentRouter = require('./routes/merchantPayment.routes');
const queryRouter = require('./routes/query.routes');
const stockRouter = require('./routes/stock.routes');

// Mount routers
app.use('/api/v1/users', userRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/auths', authRouter);
app.use('/api/v1/category', categoryRouter);
app.use('/api/v1/units', unitRouter);
app.use('/api/v1/admins', adminRouter);
app.use('/api/v1/orders', orderRouter);
app.use('/api/v1/customers', customerRouter);
app.use('/api/v1/merchants', merchantRouter);
app.use('/api/v1/invoices', invoiceRouter);
app.use('/api/v1/purchases', purchaseRouter);
app.use('/api/v1/salespayments', sPaymentRouter);
app.use('/api/v1/merchantpayments', mPaymentRouter);
app.use('/api/v1/find', queryRouter);
app.use('/api/v1/stocks', stockRouter);

//mount errorhandler
app.use(errorHandler);

module.exports = app;
