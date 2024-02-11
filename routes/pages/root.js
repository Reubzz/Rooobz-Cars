const express = require('express');
const router = express.Router();
const path = require('path');
const config = require('../../config.json')

// Databases
const carsDB = require('../../models/schemas/cars')

// MiddleWares
const { authCheck } = require("../../middleware/authentication/authentication")

router.get('/', authCheck, (req, res) => {    
    res.render('home/home', {})
})

router.get('/about', authCheck, (req, res) => {    
    res.render('about/about', {})
})
router.get('/vehicles', authCheck, async (req, res) => {   
    let vehiclesArr = await carsDB.find();
    if (req.query.sort == 'price-high-to-low') {
        vehiclesArr.sort((a, b) => b.price - a.price);
    }
    if (req.query.sort == 'price-low-to-high') {
        vehiclesArr.sort(function (a, b) { return a.price - b.price; });
    }
    if (req.query.sort == 'name-ascending') {
        vehiclesArr.sort(function (a, b) {
            var nameA = a.name.toUpperCase(), nameB = b.name.toUpperCase()
            if (nameA < nameB) return -1
            if (nameA > nameB) return 1
            return 0
        })
    }
    if (req.query.sort == 'name-descending') {
        vehiclesArr.sort(function (a, b) {
            var nameA = a.name.toUpperCase(), nameB = b.name.toUpperCase()
            if (nameA > nameB) return -1
            if (nameA < nameB) return 1
            return 0
        })
    }
    if (req.query.type == 'brand') {
        vehiclesArr.sort(function (a, b) {
            let carA = a.brand.toLowerCase() 
            let carB = b.brand.toLowerCase();
            // if ()
        })
    }
    res.render('vehicles/vehicles', {
        vehicles: vehiclesArr,
        showAllBtn: true
    })
})

router.get('/vehicles/:brand/:name', authCheck, async (req, res) => {
    const brand = req.params.brand;
    const name = req.params.name;

    let carsData = await carsDB.findOne({ name: name, brand: brand })
    console.log(carsData)
    res.render("vehicles/car", {
        vehicle: carsData,
        user: res.locals,
    })
})
router.get('/contact', authCheck, (req, res) => {    
    res.render('contact/contact', {})
})
router.get('/terms', authCheck, (req, res) => {    
    res.render('terms/terms', {})
})
router.get('/how-we-work', authCheck, (req, res) => {    
    res.render('how-we-work/how-we-work', {})
})

router.get('/account', authCheck, (req, res) => {    
    res.render('account/account', {
        user: res.locals
    })
})

router.get('/login', (req, res) => {   
    if(req.cookies.jwt) {
        return res.redirect('back') 
    } 
    res.render('authentication/login', {})
})
router.get('/register', (req, res) => {   
    if(req.cookies.jwt) {
        return res.redirect('back') 
    }  
    res.render('authentication/register', {})
})

// 404 Page
// router.get("*", (req, res) => {
//     // * TODO
//     // res.status(404).sendFile(path.join(__dirname, "../pages", "error", "404.html"));
//     res.status(404).render('errors/404', {})

// });

module.exports = router;
