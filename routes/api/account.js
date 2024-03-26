const express = require('express');
const router = express.Router();
const { authCheck } = require('../../middleware/authentication/authentication');
const { editAccount } = require('../../models/functions/account/editAccount.js')
const { changeRole } = require('../../models/functions/account/changeRole.js')
const { deleteUser } = require('../../models/functions/account/deleteUser.js')
const { pfpUpdate } = require('../../models/functions/account/pfpUpdate.js')

const { apiAuthCheck } = require('../../middleware/authentication/apiAuthentication');
const { checkOrigin } = require('../../middleware/authentication/checkOrigin');
const multer = require('multer');
const upload = multer({
    limits: {
        fileSize: 100 * 1024 * 1024, // 100MB, adjust as needed
    }
});

// ! Edit Details Account
router.patch('/edit', authCheck, checkOrigin, editAccount)

// ! Edit PFP Account
router.put('/edit', upload.single('image'), authCheck, checkOrigin, pfpUpdate)

// ! Change role - Toggles between Admin and Basic user. 
router.post('/role', apiAuthCheck, checkOrigin, changeRole)

// ! Delete User
router.delete('/', apiAuthCheck, checkOrigin, deleteUser)

module.exports = router;
