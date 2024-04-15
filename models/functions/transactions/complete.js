// Databases
const transactionsDB = require('../../schemas/transactions')
const ordersDB = require('../../schemas/orders')

// Imports
const fetch = require('node-fetch')
const { sendEmail } = require('../email/sendEmail')
const fs = require('fs');
const path = require('path')
const ejs = require('ejs');
const moment = require('moment')
const config = require('../../../config.json')

const status = {
    200: {
        message: "Transaction Status Update Success",
        code: 200
    },
    201: {
        message: "Transaction Status Update Failed",
        code: 201
    }
};
const error = {
    100: {
        message: "No Errors",
        code: 100
    },
    101: {
        message: "Transaction DB Error - Couldn't update transaction status to 'Completed'",
        code: 101
    }
};

exports.transactionComplete = async (req, res, next) => {
    let tId;
    let oId;
    
    const orderId = req.query.orderid;
    const { id } = req.body;

    if (orderId) {
        const order = await ordersDB.findOne({ _id: orderId }).populate('transaction')
        tId = order.transaction._id;
    }
    else if (id) {
        let temp = await transactionsDB.findOne({ _id: id }).populate('order')
        oId = temp.order._id
    }
    try {
        // ! Update Transaction DB
        await transactionsDB.updateOne(
            {
                _id: tId || id
            },
            {
                status: 'completed'
            }
        )

        // ! Update Orders DB
        await ordersDB.updateOne(
            {
                _id: oId || orderId
            },
            {
                status: 'active'
            }
        )

        // ! Book dates in Car Collection
        const response = await fetch(`${req.headers.origin}/api/booking/book-car-dates?orderid=${oId || orderId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        })
        const data = await response.json();
        if(data.error.code != 100) {
            res.status(400).json({
                error: data.error,
                status: data.status
            })
            return console.log("error: \n"+`${data.error.code}: ${data.error.message}\n\n ${data.status.code}: ${data.status.message}`)
        } 

        // ! Send Invoice Email
        const ress = await fetch(`${req.headers.origin}/api/invoice?orderid=${oId || orderId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        })
        const d = await ress.json();

        if(d.status.code != 200) {
            res.status(400).json({
                error: d.error,
                status: d.status
            })
            return console.log("error: \n"+`${d.error.code}: ${d.error.message}\n\n ${d.status.code}: ${d.status.message}`)
        }
        
        const orderDetails = await ordersDB.findOne({ _id: oId || orderId }).populate('car transaction user offers');

        const pdfBuffer = Buffer.from(orderDetails.invoice, 'base64');

        const template = fs.readFileSync(path.join(__dirname, '../../../templates/email.ejs'), 'utf8');
        const htmlContent = ejs.render(template, {
            invoiceNumber: orderDetails._id,
            date: moment(orderDetails.orderDate).format("DD-MM-YYYY"),
            billedTo: orderDetails.user.name,
            email: orderDetails.user.email,
            carName: orderDetails.car.brand + ' ' + orderDetails.car.name,
            carDays: orderDetails.bookedDates.length - 1,
            carPrice: orderDetails.car.price,
            offers: orderDetails.offers,
            total: orderDetails.totalCost,
            logoUrl: config.logo.alternate.light.url
        })
        
        
        await sendEmail(
            orderDetails.user.email,
            `Rooobz Cars ${orderDetails.car.brand} ${orderDetails.car.name} - Booking Invoice`,
            // `<p style="font-size: 18px">Attached is your Invoice for your Car Booking from ${orderDetails.startDate} - ${orderDetails.endDate}</p>`,
            htmlContent,
            pdfBuffer
        )

        res.status(200).json({
            error: error[100],
            status: status[200]
        })
    } catch (err) {
        res.status(401).json({
            error: error[101],
            status: status[201]
        })
        console.log(err)
    }
    
}
