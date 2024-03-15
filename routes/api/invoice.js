// Imports
const express = require('express');
const router = express.Router();
const easyinvoice = require('easyinvoice');
const fs = require('fs');
const config = require('../../config.json')
const moment = require('moment');

// Databases
const ordersDB = require('../../models/schemas/orders');

const error = {
    100: {
        message: 'No error',
        code: 100
    },
    101: {
        message: 'Payment Incomplete - Invoice cannot be made',
        code: 101
    },
    102: {
        message: 'Inovice already exists',
        code: 102
    },
    103: {
        message: 'Unknown Error',
        code: 103
    },
}

const status = {
    200: {
        message: "Invoice Created",
        code: 200,
    },
    201: {
        message: "Couldn't Create Invoice",
        code: 201,
    },
}
router.post('/', async (req, res) => {    
    const orderId = req.query.orderid;
    const force = req.query.force;
    const order = await ordersDB.findOne({ _id: orderId }).populate('transaction user car offers')

    // * If Payment is incomplete so Invoice cannot be generated
    if(order.transaction.status == 'Pending' && force != true) {
        return res.status(400).json({
            error: error[101],
            status: status[201]
        })
    }

    // * If Invoice is already created in Database. 
    if (order.invoice && force != true) {
        res.status(200).json({
            data: order.invoice,
            status: status[200],
            error: error[102]
        })
        return;
    }

    // ! Check if there are additional offers added 
    let offersData = "";
    if (order.offers) {
        offersData = order.offers.map(item => ({
            description: item.name,
            price: item.price,
        }));
    }


    try {
        data = {
            mode: "development",

            sender: config.address,
            images: {
                // logo: config.logo.alternate.url,
                background: config['invoice-template'].url
            },
            client: {
                company: order.user.name,
                address: `${order.address.flat}, ${order.address.name}, ${order.address.locality}`,
                zip: `${order.address.pin}`,
                city: `${order.address.city}`,
                country: `${order.address.country}`,
            },
            information: {
                number: order._id,
                date: `${moment(order.orderDate).format("DD-MM-YYYY")}`,
            },
            settings: {
                currency: 'INR',
                "tax-notation": "tax",
                // locale: 'en-in',
                "margin-top": 50,
                "margin-right": 50,
                "margin-left": 50,
                "margin-bottom": 25
            },
            translate: {
                "quantity": "Days",
                taxNotation: "GST",
                price: "Daily Rate",
                "products": "Car"
            },
            products: [
                {
                    description: `${order.car.brand} ${order.car.name}`,
                    price: `${order.car.price}`,
                    "tax-rate": 18,
                    quantity: order.bookedDates.length - 1
                },
                ...offersData
            ]
        }
        easyinvoice.createInvoice(data, async function (result) {
            await ordersDB.updateOne(
                {
                    _id: orderId
                },
                {
                    invoice: result.pdf
                }
            )
            // console.log('new pdf created')
            res.status(200).json({
                data: result.pdf,
                error: error[100], 
                status: status[200]
            })
        }).catch(err => console.log(err)) 

    } catch (err) {
        console.log('invoice api - ' + err)
        return res.status(400).json({
            error: error[103],
            status: status[201]
        })
    }
})

module.exports = router;