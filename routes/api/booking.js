const express = require('express');
const router = express.Router();
const { authCheck } = require('../../middleware/authentication/authentication');
const { orderCreate } = require('../../models/functions/booking/order-create.js')
const { orderComplete } = require('../../models/functions/booking/order-complete.js')
const { carBookDates } = require('../../models/functions/booking/book-car-dates.js')
const { orderCancel } = require('../../models/functions/booking/cancel-order.js')
const { apiAuthCheck } = require('../../middleware/authentication/apiAuthentication');
const { checkOrigin } = require('../../middleware/authentication/checkOrigin');
// ! Create Order API Endpoint
router.post('/order-create', authCheck, checkOrigin, orderCreate);

// ! Order Complete API Endpoint
router.post('/order-complete', authCheck, checkOrigin, orderComplete);

// ! Book Car Dates after payment completion
router.post('/book-car-dates', authCheck, checkOrigin, carBookDates)

// ! Cancel Order and Cancel Transaction
router.post('/cancel-order', authCheck, checkOrigin, orderCancel);
module.exports = router;
