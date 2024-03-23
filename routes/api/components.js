const express = require('express');
const router = express.Router();
const path = require('path');
const config = require('../../config.json')
const { authCheck } = require('../../middleware/authentication/authentication');

const { apiAuthCheck } = require('../../middleware/authentication/apiAuthentication');
const { checkOrigin } = require('../../middleware/authentication/checkOrigin');

// ! Components
router.get('/:filename', authCheck, checkOrigin, (req, res) => {    
    res.render(`components/${req.params.filename}`, {
        query: req.query,
        config: config,
        user: res.locals,
    })
})

module.exports = router;
