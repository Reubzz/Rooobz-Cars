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
router.get('/vehicles', (req, res) => {   
    let vehiclesArr = [
        {
            name: 'A1',
            brand: 'Audi',
            price: 4500,
            seats: 4,
            engineType: 'Diesel',
            transmission: 'Manual',
        },
        {
            name: 'C Class',
            brand: 'Mercedes',
            price: 2500,
            seats: 4,
            engineType: 'Petrol',
            transmission: 'Automatic',
        },
        {
            name: 'Glanza',
            brand: 'Toyota',
            price: 1000,
            seats: 5,
            engineType: 'Diesel',
            transmission: 'Semi-Auto',
        },
        {
            name: 'Aventador',
            brand: 'Lamborgini',
            price: 3500,
            seats: 2,
            engineType: 'Petrol',
            transmission: 'Manual',
        },
        {
            name: 'Golf 6',
            brand: 'Volkswagen',
            price: 1200,
            seats: 4,
            engineType: 'Petrol',
            transmission: 'Manual',
        },
        {
            name: 'X5',
            brand: 'BMW',
            price: 1500,
            seats: 4,
            engineType: 'Diesel',
            transmission: 'Automatic',
        },
        {
            name: 'Nano',
            brand: 'Tata',
            price: 500,
            seats: 4,
            engineType: 'Petrol',
            transmission: 'Manual',
        },
        {
            name: 'Swift',
            brand: 'Maruti',
            price: 400,
            seats: 4,
            engineType: 'Diesel',
            transmission: 'Automatic',
        },
        {
            name: 'Magnite',
            brand: 'Nissan',
            price: 1400,
            seats: 4,
            engineType: 'Diesel',
            transmission: 'Automatic',
        },
        {
            name: 'Wrangler',
            brand: 'Jeep',
            price: 4200,
            seats: 4,
            engineType: 'Diesel',
            transmission: 'Manual',
        },
        {
            name: 'Vellfire',
            brand: 'Toyota',
            price: 3155,
            seats: 4,
            engineType: 'Petrol',
            transmission: 'Manual',
        },
    ]
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
router.get('/contact', (req, res) => {    
    res.render('contact/contact', {})
})
router.get('/terms', (req, res) => {    
    res.render('terms/terms', {})
})
router.get('/how-we-work', (req, res) => {    
    res.render('how-we-work/how-we-work', {})
})
router.get('/login', (req, res) => {    
    res.render('authentication/login', {})
})
router.get('/register', (req, res) => {    
    res.render('authentication/register', {})
})
router.get("/logout", (req, res) => {
    res.cookie("jwt", "", { maxAge: "1" })
    res.redirect("back")
})

// 404 Page
// router.get("*", (req, res) => {
//     // * TODO
//     // res.status(404).sendFile(path.join(__dirname, "../pages", "error", "404.html"));
//     res.status(404).render('errors/404', {})

// });

module.exports = router;
