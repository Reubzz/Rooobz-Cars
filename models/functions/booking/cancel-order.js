// Databases
const ordersDB = require('../../schemas/orders')
const transactionsDB = require('../../schemas/transactions')
const carsDB = require('../../schemas/cars')

const status = {
    200: {
        message: "Order cancelled sucessfully to updated status",
        code: 200
    },
    201: {
        message: "Order couldn't be cancelled",
        code: 201
    }
};
const error = {
    100: {
        message: "No Errors",
        code: 100
    },
    101: {
        message: "Orders DB Error - Order couldn't be cancelled",
        code: 101
    },
    102: {
        message: "Transactions DB Error - Order couldn't be cancelled",
        code: 102
    },
    103: {
        message: "Unknown Error - Order couldn't be cancelled",
        code: 103
    }
};

exports.orderCancel = async (req, res, next) => {
    const { id } = req.body;
    const orderId = id || req.query.orderid
    const order = await ordersDB.findOne({ _id : orderId }).populate('transaction car')

    let transactionStatus;
    if (order.transaction.status == 'completed') transactionStatus = 'refunded'
    else if (order.transaction.status == 'pending') transactionStatus = 'cancelled'
    
    try {
        await ordersDB.updateOne(
            {
                _id: orderId
            },
            {
                status: 'cancelled'
            }
        )
        await transactionsDB.updateOne(
            {
                _id: order.transaction._id
            },
            {
                status: transactionStatus
            }
        )

        res.status(200).json({
            error: error[100],
            status: status[200],
        })
    }
    catch (err) {
        return res.status(401).json({
            error: error[101],
            status: status[201],
        })
    }
}

