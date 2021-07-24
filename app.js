const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const morgan = require('morgan');
const errorHandler = require('./middleware/error');
const connectDB = require('./db');

//connect database
connectDB();

// Body parser
app.use(bodyParser.json());

app.use(morgan('dev'));

// Route files
const userRouter = require('./routes/users.routes');
const productRouter = require('./routes/product.routes');
const paymentRouter = require('./routes/payment.routes');

// Mount routers
app.use('/api/v1/users', userRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/payments', paymentRouter);

//mount errprhandler
app.use(errorHandler);

module.exports = app;
