const express = require('express');
const router = express.Router();
const { authCheck } = require('../../middleware/authentication/authentication');
const { editAccount } = require('../../models/functions/account/editAccount.js')
const { changeRole } = require('../../models/functions/account/changeRole.js')
const { deleteUser } = require('../../models/functions/account/deleteUser.js')

const { apiAuthCheck } = require('../../middleware/authentication/apiAuthentication');
const { checkOrigin } = require('../../middleware/authentication/checkOrigin');

// ! Edit Account
router.post('/edit', authCheck, checkOrigin, editAccount)

// ! Change role - Toggles between Admin and Basic user. 
router.post('/role', apiAuthCheck, checkOrigin, changeRole)

// ! Delete User
router.delete('/', apiAuthCheck, checkOrigin, deleteUser)

module.exports = router;
