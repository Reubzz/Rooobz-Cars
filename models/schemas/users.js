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
    'user',
    new mongoose.Schema({
        id: { type: String, required: true }, // ! auto generated unique ID of the car [ REQUIRED ]
        username: { type: String, required: true }, // ! unique username of the person
        password: { type: String, required: true }, // ! hashed password of the used
        name: { type: String, required: true }, // ! Name of the user
        email: { type: String, required: true }, // ! Email of the user
        createdDate: { type: Date, required: true }, // ! Date of Account Creation
        phone: { type: Number, required: false }, // * Contact Number of the user
        age: { type: Date, required: false }, // * Date of birth 
        address: { 
            address: { type: String, required: false }, // * Street of the user
            flat: { type: String, required: false }, // * Flat Number / Room Number
            name: { type: String, required: false }, // * Name of the building
            locality: { type: String, required: false }, // * Locality / Area 
            city: { type: String, required: false }, // * City of the user 
            state: { type: String, required: false }, // * State of the user
            country: { type: String, required: false }, // * Country of the user
            pin: { type: Number, required: false}, // * Pin Code of the user
            landmark: { type: String, required: false }, // * Nearby Landmark
        },
        profileImg: { type: String, required: false, default: "https://reubz.s3.ap-south-1.amazonaws.com/default-user-img.png"}, // ? Profile Image of the user. Defualts to basic image if not provided.

        orders: [
            { 
                type: mongoose.Schema.Types.ObjectId, 
                ref: 'order', 
                required: false 
            }
        ], // * Array of order IDs from "orders collection"
        reviews: [
            { 
                type: mongoose.Schema.Types.ObjectId, 
                ref: 'review', required: false 
            }
        ], // * Array of Reviews ID from "reviews collection"

        license: { type: String, required: false }, // ! Driving license Image Link
        
        role: { type: String, required: false, default: 'basic'}
    })
)
module.exports = model;