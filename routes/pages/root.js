const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res) => {    
    res.render('home/home', {
        data: "test-data"
    })
})

router.get('/about', (req, res) => {    
    res.render('about/about', {})
})
router.get('/contact', (req, res) => {    
    res.render('contact/contact', {})
})
router.get('/login', (req, res) => {    
    res.render('authentication/login', {})
})
router.get('/register', (req, res) => {    
    res.render('authentication/register', {})
})

module.exports = router;
