/** @format */

//const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const morgan = require('morgan');
const fileupload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const errorHandler = require('./middleware/error');
const connectDB = require('./db');

//connect database
connectDB();

// Body parser
app.use(express.json());

//cookie parser
app.use(cookieParser());

//use fileupload
app.use(fileupload());

app.use(morgan('dev'));

// Route files
const userRouter = require('./routes/users.routes');
const productRouter = require('./routes/product.routes');
// const paymentRouter = require('./routes/payment.routes');
const authRouter = require('./routes/auth.routes');
const categoryRouter = require('./routes/category.routes');
const unitRouter = require('./routes/unit.routes');
const adminRouter = require('./routes/admin.routes');
const merchantRouter = require('./routes/merchant.routes');
const invoiceRouter = require('./routes/invoice.routes');
const purchaseRouter = require('./routes/purchase.route');

// Mount routers
app.use('/api/v1/users', userRouter);
app.use('/api/v1/products', productRouter);
// app.use('/api/v1/payments', paymentRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/category', categoryRouter);
app.use('/api/v1/units', unitRouter);
app.use('/api/v1/admin', adminRouter);
app.use('/api/v1/merchants', merchantRouter);
app.use('/api/v1/invoices', invoiceRouter);
app.use('/api/v1/purchases', purchaseRouter);

//mount errprhandler
app.use(errorHandler);

module.exports = app;
