const { mongoose } = require('../../db.js')

/**
 *  Documentation : Symbols used
 *      ! means this field is REQUIRED
 *      ? Means it has a default value if not provided 
 *      * Additional Data not compulsory but needed. 
 */

const model = mongoose.MAIN_DB.model(
    'review',
    new mongoose.Schema({
        user: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'user', 
            required: true 
        }, // ! ID of the user that reviewed
        car: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'car', 
            required: true 
        }, // ! ID of the car that is reviewed
        content: { type: String, required: true },
        rating: { type: Number, required: true },
        createdAt: { type: Date, default: new Date() }, // ! Date of Creation
        
    })
)
module.exports = model;