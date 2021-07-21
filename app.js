const express = require('express');
const app = express();

const morgan = require('morgan');
app.use(morgan('dev'));

// @dev json parser on request
const bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

module.exports = app;
