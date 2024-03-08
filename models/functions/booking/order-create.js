// PAyment Flow / Confirm Booking Flow / Adds a car to the users transanctions
/**
 * 
 * @function processing()
 *  * Callback 
 *      * Success 
 *      ! Failed
 * @function saveData()
 *  * Save address and phone number Data to UserDB
 * 
 * @function confirm()
 *      @function processing() ?? 
 *          Update Transactions DB
 *              * Update status of transaction as "Completed" 
 *              * Add transaction id to user's transactions list in UserDB
 *              * Update car status to "booked" is CarsDB
 *              ! Update Status of transaction as "Failed" & Delete from DB / Do Not Add to DB
 * 
 * @function confrimPage()
 *      @function confirm() ?? 
 *          * show confirm page with all details of the car and transaction details
 *          ! show failed page and redirect back to booking page 
 *
1 *   
*/

/**
 * @status codes
 * * 200 - Edited user
 * ! 201 - Couldn't Edit user
 * 
 * @error codes 
 * * 100 - No errors
 * ! 101 - Invalid Field
 * ! 102 - Field Value already in use
 * ! 103 - Field restricted
 * ! 104 - Database Error
 * ! 105 - Unknown Error
*/

// Imports
const mongoose = require('mongoose');

// Stripe 
const stripe = require('stripe')('sk_test_51OriCPSJAPyxY5J13cG7iIOc4vfrtsmWXQcMOnfnswH9QyshknBm0joFrLYRCycXHwSuKnQSo8IGNqu0sPHo5CGu00IOrjeNtG')


// Databases
const UsersDB = require('../../schemas/users')
const CarsDB = require('../../schemas/cars')
const transactionsDB = require('../../schemas/transactions')
const ordersDB = require('../../schemas/orders')


const status = {
    200: {
        message: "Payment Success",
        code: 200
    },
    201: {
        message: "Payment Failed",
        code: 201
    }
};
const error = {
    100: {
        message: "No Errors",
        code: 100
    },
    101: {
        message: "Transaction DB Error",
        code: 101
    },
    102: {
        message: "User DB Error",
        code: 102
    },
    103: {
        message: "",
        code: 103
    },
    104: {
        message: "",
        code: 104
    },
    105: {
        message: "Unknown Error",
        code: 105
    },
};

exports.orderCreate = async (req, res, next) => {
    const formData = req.body;
    console.log('pay api function - ', formData) // ! DeBuG
    
    if (formData.saveInfo == 'on') {
        try {
            await UsersDB.updateOne(
                {
                    _id: res.locals._id 
                }, 
                {
                    address: {
                        address: formData.address,
                        flat: formData.flat,
                        name: formData.placename,
                        locality: formData.locality,
                        city: formData.city,
                        state: formData.state,
                        country: formData.country,
                        pin: formData.pin,
                        landmark: formData.landmark,
                    }
                },
            )
        } catch (err) {
            res.status(201).json({
                error: error[102],
                status: status[201],
            })
        }
    }

    try {
        const transactionId = new mongoose.Types.ObjectId();
        const orderId = new mongoose.Types.ObjectId();
        
        await transactionsDB.create({
            _id: transactionId,
            order: orderId,
            status: "Pending",
            date: {
                initiated: new Date()
            }
        })
        
        await ordersDB.create({ 
            _id: orderId,
            car: formData.carId,
            user: formData.userId,
            transaction: transactionId, // TODO: Add trasaction ID
            offers: JSON.parse(formData.offers),
            totalCost: formData.finalPrice,
            startDate: formData.pickupDate,
            endDate: formData.dropoffDate,
            location: formData.location,
            address: {
                address: formData.address,
                flat: formData.flat,
                name: formData.placename,
                locality: formData.locality,
                city: formData.city,
                state: formData.state,
                country: formData.country,
                pin: formData.pin,
                landmark: formData.landmark,
            },
            status:  'Initiated',
            orderDate: new Date(),
        })
        
        // // TODO: Add Transaction System Stripe API / RazorPay 
        // const paymentIntent = await stripe.paymentIntents.create({
        //     amount: formData.finalPrice,
        //     currency: 'inr'
        // });

        // res.json({client_secret: paymentIntent.client_secret});
        res.json({
            orderId: orderId,
            transactionId: transactionId
        })
    } catch (err) {
        res.status(401).json({
            status: status[201],
            error: error[101]
        })
        console.log(err)
    }
}
