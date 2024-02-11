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
    'email_subscriber',
    new mongoose.Schema({
        id: { type: String, required: true }, // ! auto generated unique ID [ REQUIRED ]
        email: { type: String, required: true }, // ! Email of the user
        createdAt: { type: Date, default: new Date() }, // ! Date of Creation
    })
)
module.exports = model;