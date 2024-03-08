const mongoose = require('mongoose')
const db = require('../../db.js')

/**
 * 
 *  Documentation : Symbols used
 *      ! means this field is REQUIRED
 *      ? Means it has a default value if not provided 
 *      * Additional Data not compulsory but needed. 
 */

const model = db.MAIN_DB.model(
    'order',
    new mongoose.Schema({
        car: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'car', 
            required: true 
        }, // ! ID of the car that is booked
        user: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'user', 
            required: true
        }, // ! ID of the User that did the booking
        transaction: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'transaction', 
            required: true 
        }, // ! Transaction Id associated with this order
        
        offers: [
            { 
                type: mongoose.Schema.Types.ObjectId, 
                ref: 'offer', 
                required: false 
            }
        ], // ? Offers applied to this Order
        
        totalCost: { type: String, required: true }, // ! Total Cost of the transaction

        startDate: { type: Date, required: true }, // ! Start Date of Car Booking 
        endDate: { type: Date, required: true }, // ! Ending Date of Car Booking 

        location: { type: String , required: true}, // ! Pickup / Dropoff Location of Car Booking
        
        address: { 
            address: { type: String, required: true }, // * Street of the user
            flat: { type: String, required: false }, // * Flat Number / Room Number
            name: { type: String, required: true }, // * Name of the building
            locality: { type: String, required: true }, // * Locality / Area 
            city: { type: String, required: true }, // * City of the user 
            state: { type: String, required: true }, // * State of the user
            country: { type: String, required: true }, // * Country of the user
            pin: { type: Number, required: true}, // * Pin Code of the user
            landmark: { type: String, required: false }, // * Nearby Landmark
        },

        status: { type: String, required: true }, // ! Ongoing  / Completed / Cancelled
        
        orderDate: { type: Date, required: true }, // ! Date of Transaction Done
    })
)
module.exports = model;