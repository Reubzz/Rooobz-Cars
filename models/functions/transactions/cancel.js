
// Databases
const transactionsDB = require('../../schemas/transactions')
const ordersDB = require('../../schemas/orders')

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
        message: "Transaction DB Error - Couldn't update transaction status to 'Cancelled'",
        code: 101
    }
};

exports.transactionCancel = async (req, res, next) => {
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
        await transactionsDB.updateOne(
            {
                _id: tId || id
            },
            {
                status: 'cancelled'
            }
        )
        await ordersDB.updateOne(
            {
                _id: oId || orderId
            },
            {
                status: 'cancelled'
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
