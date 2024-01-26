const express = require('express');
const router = express.Router();
const path = require('path');


// ! Components
router.get('/:filename', (req, res) => {    
    res.render(`components/${req.params.filename}`, req.query)
})

module.exports = router;
