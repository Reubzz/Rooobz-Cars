const express = require('express');
const router = express.Router();
const { authCheck } = require('../../middleware/authentication/authentication');
const { editAccount } = require('../../models/functions/account/editAccount.js')

// ! Edit Account
router.post('/edit', authCheck, editAccount)

module.exports = router;
