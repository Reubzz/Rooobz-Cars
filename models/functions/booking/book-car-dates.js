
// Databases
const ordersDB = require('../../schemas/orders')
const carsDB = require('../../schemas/cars')
const usersDB = require('../../schemas/users')

// imports 
const moment = require('moment');


const status = {
    200: {
        message: "Car  Booking Dates Update Success",
        code: 200
    },
    201: {
        message: "Car  Booking Dates Update Failed",
        code: 201
    }
};
const error = {
    100: {
        message: "No Errors",
        code: 100
    },
    101: {
        message: "Cars DB Error - Couldn't update cars Booked Dates",
        code: 101
    }
};

exports.carBookDates = async (req, res, next) => {
    const orderId = req.query.orderid;
    const order = await ordersDB.findOne({ _id: orderId }).populate('car')
    const user = await usersDB.findOne({ _id: res.locals._id })
    const startDate = moment(order.startDate, 'DD-MM-YYYY')
    const endDate = moment(order.endDate, 'DD-MM-YYYY')
    
    const dateArray = [];
    
    while (startDate.isSameOrBefore(endDate, 'day')) {
        dateArray.push(startDate.format('DD-MM-YYYY'));
        startDate.add(1, 'days');
    }

    try {
        await carsDB.updateOne(
            {
                _id: order.car._id,
            },
            {
                orders: order._id,
            }
        )
        order.bookedDates = dateArray

        
        await usersDB.updateOne(
            {
                _id: res.locals._id
            },
            {
                orders: [`${orderId}`]
            }
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
    }
    
}
