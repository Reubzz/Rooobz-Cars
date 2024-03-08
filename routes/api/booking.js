const express = require('express');
const router = express.Router();
const { authCheck } = require('../../middleware/authentication/authentication');
const { orderCreate } = require('../../models/functions/booking/order-create.js')

// ! Create Order API Endpoint
router.post('/order-create', authCheck, orderCreate)


module.exports = router;
