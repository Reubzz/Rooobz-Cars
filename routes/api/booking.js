const express = require('express');
const router = express.Router();
const { authCheck } = require('../../middleware/authentication/authentication');
const { orderCreate } = require('../../models/functions/booking/order-create.js')
const { transactionComplete } = require('../../models/functions/booking/transaction-complete.js')
const { orderComplete } = require('../../models/functions/booking/order-complete.js')
const { carBookDates } = require('../../models/functions/booking/book-car-dates.js')

// ! Create Order API Endpoint
router.post('/order-create', authCheck, orderCreate);

// ! Order Complete API Endpoint
router.post('/order-complete', authCheck, orderComplete);

// ! Order Payment Complete API Endpoint
router.post('/transaction-complete', authCheck, transactionComplete)

// ! Book Car Dates after payment completion
router.post('/book-car-dates', authCheck, carBookDates)
module.exports = router;
