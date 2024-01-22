const mongoose = require('mongoose')
const db = require('../../db.js')

/**
 * 
 *  Documentation : Symbols used
 *      ! means this field is REQUIRED
 *      ? Means it has a default value if not provided 
 *      * Additional Data not compulsory but needed. 
 */

const mondel = db.MAIN_DB.model(
    'user',
    new mongoose.Schema({
        id: { type: String, required: true }, // ! auto generated unique ID of the car [ REQUIRED ]
        username: { type: String, required: true }, // ! unique username of the person
        password: { type: String, required: true }, // ! hashed password of the used
        firstname: { type: String, required: true }, // ! Fist name of the user
        lastname: { type: String, required: true }, // ! Last name of the user
        email: { type: String, required: true }, // ! Email of the user
        createdDate: { type: Date, required: true }, // ! Date of Account Creation
        phone: { type: Number, required: true }, // ! Contact Number of the user
        age: { type: Date, required: true }, // ! Date of birth 
        location: { type: String, required: true }, // ! Location of the user
        address: { type: String, required: true }, // ! Exact Address of the user
        city: { type: String, required: true }, // ! City of the user 
        state: { type: String, required: true }, // ! State of the user
        pinCode: { type: Number, required: true}, // ! Pin Code of the user
        profileImg: { type: String, required: false, default: "https://reubz.s3.ap-south-1.amazonaws.com/default-user-img.png"}, // ? Profile Image of the user. Defualts to basic image if not provided.

        transanctions: { type: Array }, // * Array of Transactions ID from "transactions collection"
        reviews: { type: Array }, // * Array of Reviews ID from "reviews collection"

        license: { type: Image, required: true } // ! Driving license Image
        
    })
    
)