const express = require('express');
const router = express.Router();
const { authCheck } = require('../../middleware/authentication/authentication');
const { transactionComplete } = require('../../models/functions/booking/transaction-complete.js')

// ! Order Complete API Endpoint
// ! Order Payment Complete API Endpoint
router.post('/complete', authCheck, transactionComplete)


module.exports = router;
