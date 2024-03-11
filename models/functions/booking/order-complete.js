// Databases
const ordersDB = require('../../schemas/orders')


const status = {
    200: {
        message: "Order updated sucessfully to updated status",
        code: 200
    },
    201: {
        message: "Order Couldn't be updated to complete status",
        code: 201
    }
};
const error = {
    100: {
        message: "No Errors",
        code: 100
    },
    101: {
        message: "Orders DB Error - Order Couldn't be updated to complete status",
        code: 101
    }
};

exports.orderComplete = async (req, res, next) => {
    const orderId = req.query.id

    try {
        await ordersDB.updateOne(
            {
                _id: orderId
            },
            {
                status: 'completed'
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

