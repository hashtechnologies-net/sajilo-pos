const express = require('express');
const customerAuth = require('../controller/customer.controller');
const custprotect = require('../middleware/authCustomer');

const router = express.Router();

router.route('/register').post(customerAuth.register);
router.route('/customer_login').post(customerAuth.login);
router.route('/get_customer').get(custprotect.protect, customerAuth.getMe);
router.route('/logout').get(customerAuth.logout);
router.route('/getadmins').get(customerAuth.getCustomers);

module.exports = router;