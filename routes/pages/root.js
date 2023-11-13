const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res) => {
    // res.send("Hello World")

    res.render('home/home', {
        data: "test-data"
    })
})


module.exports = router;
