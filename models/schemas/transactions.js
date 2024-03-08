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
    'transaction',
    new mongoose.Schema({
        order: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'order', 
            required: true 
        }, // ! ID of the car that is booked
        status: { type: String, required: true }, // ! Pending  / Completed / Cancelled
        date: {
            initiated: { type: Date, required: true }, // ! Date when transaction was created 
            completed: { type: Date, required: false } // * Date when transaction was completed
        }
    })
)

module.exports = model;