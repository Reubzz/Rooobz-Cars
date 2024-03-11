
// Databases
const transactionsDB = require('../../schemas/transactions')
const ordersDB = require('../../schemas/orders')

// Imports
const { carBookDates } = require('./book-car-dates')

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
    const orderId = req.query.orderid;
    const order = await ordersDB.findOne({ _id: orderId }).populate('transaction')
    try {
        await transactionsDB.updateOne(
            {
                _id: order.transaction._id
            },
            {
                status: 'completed'
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
