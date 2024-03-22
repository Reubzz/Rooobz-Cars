const express = require('express');
const router = express.Router();
const { authCheck } = require('../../middleware/authentication/authentication');
const { orderCreate } = require('../../models/functions/booking/order-create.js')
const { orderComplete } = require('../../models/functions/booking/order-complete.js')
const { carBookDates } = require('../../models/functions/booking/book-car-dates.js')
const { orderCancel } = require('../../models/functions/booking/cancel-order.js')

// ! Create Order API Endpoint
router.post('/order-create', authCheck, orderCreate);

// ! Order Complete API Endpoint
router.post('/order-complete', authCheck, orderComplete);

// ! Book Car Dates after payment completion
router.post('/book-car-dates', authCheck, carBookDates)

// ! Cancel Order and Cancel Transaction
router.post('/cancel-order', authCheck, orderCancel);
module.exports = router;
