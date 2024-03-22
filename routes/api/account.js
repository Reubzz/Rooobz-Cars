const express = require('express');
const router = express.Router();
const { authCheck } = require('../../middleware/authentication/authentication');
const { editAccount } = require('../../models/functions/account/editAccount.js')
const { changeRole } = require('../../models/functions/account/changeRole.js')
const { deleteUser } = require('../../models/functions/account/deleteUser.js')

// ! Edit Account
router.post('/edit', authCheck, editAccount)

// ! Change role - Toggles between Admin and Basic user. 
router.post('/role', authCheck, changeRole)

// ! Delete User
router.delete('/', authCheck, deleteUser)

module.exports = router;
