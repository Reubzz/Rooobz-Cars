const express = require('express');
const router = express.Router();
const { authCheck } = require('../../middleware/authentication/authentication');
const { transactionComplete } = require('../../models/functions/transactions/complete.js')
const { transactionReactivate } = require('../../models/functions/transactions/reactivate.js')
const { transactionRefund } = require('../../models/functions/transactions/refund.js')
const { transactionCancel } = require('../../models/functions/transactions/cancel.js')

// ! Order Complete API Endpoint
// ! Order Payment Complete API Endpoint
router.post('/complete', authCheck, transactionComplete)

router.post('/reactivate', authCheck, transactionReactivate)

router.post('/refund', authCheck, transactionRefund)

router.post('/cancel', authCheck, transactionCancel)

module.exports = router;
