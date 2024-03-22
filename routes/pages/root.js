const express = require('express');
const router = express.Router();
const path = require('path');
const config = require('../../config.json');

// Stripe Payment Gateway 
const stripe = require('stripe')('sk_test_51OriCPSJAPyxY5J13cG7iIOc4vfrtsmWXQcMOnfnswH9QyshknBm0joFrLYRCycXHwSuKnQSo8IGNqu0sPHo5CGu00IOrjeNtG')

// Databases
const carsDB = require('../../models/schemas/cars');
const usersDB = require('../../models/schemas/users');
const offersDB = require('../../models/schemas/offers');
const ordersDB = require('../../models/schemas/orders');
const transactionsDB = require('../../models/schemas/transactions');
const emailsDB = require('../../models/schemas/email-subscribe');


// MiddleWares
const { authCheck } = require("../../middleware/authentication/authentication")

router.get('/', authCheck, async (req, res) => {
    const allBrands = await carsDB.find().distinct('brand').sort({ brand: 1 })
    // const vehiclesBrands = allCars.distinct('brand').sort({ brand: 1 })

    res.render('home/home', {
        allBrands: allBrands,
        allTypes: null // ! Fix Later
    })
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
        showAllBtn: true,
        user: res.locals,
    })
})

router.get('/vehicles/:brand/:name', authCheck, async (req, res) => {
    const brand = req.params.brand;
    const name = req.params.name;

    let carData = await carsDB.findOne({ name: name, brand: brand })
    res.render("vehicles/car", {
        car: carData,
        user: res.locals,
    })
})

router.get('/booking', authCheck, async (req, res) => {
    const carId = req.query.id;

    if (req.cookies.jwt) {
        const carData = await carsDB.findOne({ _id: carId }).populate('orders');
        const offersData = await offersDB.find();
        res.render('vehicles/booking', {
            user: await usersDB.findOne({ _id: res.locals._id }),
            car: carData,
            offers: offersData,
        })
    }
    else {
        res.redirect('/login')
    }
})

router.get('/booking/pay', authCheck, async (req, res) => {
    const orderId = req.query.id;

    if (!req.cookies.jwt)
        return res.redirect("/login");
    const orderData = await ordersDB.findOne({ _id: orderId }).populate('car offers user transaction');

    // TODO: Check if order is completed or failed and redirect back.

    const paymentIntent = await stripe.paymentIntents.create({
        // ! *100 as stripe takes last two numbers in decimal.
        // ! For eg: if price is 2455 - normally it would be taken as 24.55 
        // ! Hence the *100 to make the number 245500 which is 2455.00 acc to stripe
        amount: orderData.totalCost * 100, 
        currency: 'inr'
    });

    res.render('vehicles/payment', {
        client_secret: paymentIntent.client_secret,
        orderData: orderData
    })
})

router.get('/booking/complete', async (req, res) => {
    const orderId = req.query.orderid;

    const orderData = await ordersDB.findOne({ _id: orderId }).populate('car user transaction offers');
    res.render('vehicles/complete', {
        order: orderData,
    })
})

router.get('/contact', authCheck, (req, res) => {
    res.render('contact/contact', {})
})
router.get('/terms', authCheck, (req, res) => {
    res.render('terms/terms', {})
})
router.get('/cancellation-policy', authCheck, (req, res) => {
    res.render('terms/cancellation-policy', {
        config: config
    })
})
router.get('/how-we-work', authCheck, (req, res) => {
    res.render('how-we-work/how-we-work', {})
})

router.get('/account/profile', authCheck, async (req, res) => {
    if (req.cookies.jwt) {
        res.render('account/account', {
            user: await usersDB.findOne({ _id: res.locals._id })
        })
    }
    else {
        res.redirect('/login')
    }
})

router.get("/account/bookings", authCheck, async (req, res) => {
    if (!req.cookies.jwt) return res.redirect('/login');

    res.render('account/bookings', {
        orders: await ordersDB.find({ user: res.locals._id }).populate('car transaction user offers'),
        user: await usersDB.findOne({ _id: res.locals._id }),
        config: config
    })
})
router.get("/admin", authCheck, async (req, res) => {
    const { orders, users, cars, transactions, subscribers } = req.query;

    
    if (res.locals.role != "admin") return res.redirect('back');

    const ordersData = await ordersDB.find().populate('car transaction user offers');
    const usersData = await usersDB.find().populate('orders'); // ! Add Reviews Here later
    const carsData = await carsDB.find().populate('orders'); 
    const transactionsData = await transactionsDB.find().populate({
        path: 'order',
        populate: { 
            path: 'car user offers'
        }
    })
    const subscribersData = await emailsDB.find(); 

    if (orders) return res.json({ orders: ordersData });
    if (users) return res.json({ users: usersData });
    if (cars) return res.json({ cars: carsData });
    if (transactions) return res.json({ transactions: transactionsData });
    if (subscribers) return res.json({ subscribers: subscribersData });
    
    res.render('admin/admin', {
        orders: ordersData,
        users: usersData, 
        cars: carsData,
        transactions: transactionsData,
        subscribers: subscribersData,
        config: config
    })
})

router.get('/login', (req, res) => {
    if (req.cookies.jwt) {
        return res.redirect('back')
    }
    res.render('authentication/login', {})
})
router.get('/register', (req, res) => {
    if (req.cookies.jwt) {
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
