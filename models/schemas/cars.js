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
    'car',
    new mongoose.Schema({
        id: { type: String, required: true }, // ! auto generated unique ID of the car [ REQUIRED ]
        name: { type: String, required: true }, // ! Model of the car - [Eg. Nano]
        brand: { type: String, required: true }, // ! make of the car - [Eg. Tata]
        color: { type: String, required: true }, // ! Color of the car 
        descrption: { type: String, maxlength: 128 }, // * Description the car 
        condition: { type: String, required: true }, // ! Condition of the car 
        doors: { type: Number, default: 4 }, // ? Number of Doors the car has [ defaults to 4 ]
        transmission: { type: String, default: "Manual" }, // ? Manual, Automatic, Semi Automatic [ defaults to Manual ]
        fuelType: { type: String, required: true }, // ! Petrol, Disel, Hybrid  [ REQUIRED ]
        seats: { type: String, default: 4 }, // ? Number Seats in the car - [ defaults to 4 ]
        price: { type: Number, default: 0 }, // ? Price of the car - [ defaults to 0 ]
        discount: { type: Number, required: true }, // ! in % 0 to 100 (100 means free) [ REQUIRED ]
        status: { type: Boolean, default: true }, // ? Availability of the car [ defaults to false ] (true = available | false = not available)
        imgUrls: [{ type: String }], // * Array of Images 
        createTime: { type: Date, default: Date.now() }, // ? Time this car dataset was created - [ defaults to current date if not provided ]
        updateTime: { type: Date, default: Date.now() }, // ? Time this car dataset was updated - [ defaults to current date if not provided ]
        bookedDates: { type: Array, required: false } // * Dates when the car is already booked by users
    })
)
module.exports = model;