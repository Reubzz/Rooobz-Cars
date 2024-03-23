const express = require('express');
const router = express.Router();
const { authCheck } = require('../../middleware/authentication/authentication');
const { transactionComplete } = require('../../models/functions/transactions/complete.js')
const { transactionReactivate } = require('../../models/functions/transactions/reactivate.js')
const { transactionRefund } = require('../../models/functions/transactions/refund.js')
const { transactionCancel } = require('../../models/functions/transactions/cancel.js')
const { apiAuthCheck } = require('../../middleware/authentication/apiAuthentication');
const { checkOrigin } = require('../../middleware/authentication/checkOrigin');

// ! Transaction API Endpoint
router.post('/complete', authCheck, checkOrigin, transactionComplete)

router.post('/reactivate', apiAuthCheck, checkOrigin, transactionReactivate)

router.post('/refund', apiAuthCheck, checkOrigin, transactionRefund)

router.post('/cancel', apiAuthCheck, checkOrigin, transactionCancel)

module.exports = router;
