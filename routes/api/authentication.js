const express = require('express')
const router = express.Router()
const path = require('path')

const { registerUser } = require('../../models/functions/authentication/registerUser')
const { loginUser } = require('../../models/functions/authentication/loginUser')
const { deleteUser } = require('../../models/functions/authentication/deleteUser')
const { apiAuthCheck } = require('../../middleware/authentication/apiAuthentication');
const { checkOrigin } = require('../../middleware/authentication/checkOrigin');

// ! User registration flow 
router.route('/register').post(checkOrigin, registerUser)

// ! Login Flow
router.route('/login').post(checkOrigin, loginUser)

// ! User Account Deletion flow
router.route('/delete').delete(apiAuthCheck, checkOrigin, deleteUser)

// ! User Logout Flow 
router.route('/logout').get((req, res) => {
    res.cookie("jwt", "", { maxAge: "-1", sameSite: 'lax'  })
    res.redirect("back")
})


module.exports = router;