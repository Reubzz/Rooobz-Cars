const { mongoose } = require('../../db.js')

/**
 * 
 *  Documentation : Symbols used
 *      ! means this field is REQUIRED
 *      ? Means it has a default value if not provided 
 *      * Additional Data not compulsory but needed. 
 */

const model = mongoose.MAIN_DB.model(
    'offer',
    new mongoose.Schema({
        name: { type: String, required: true }, 
        description: { type: String, required: true },
        price: { type: String, required: true },
        icon: { type: String, required: true },
        active: { type: Boolean, required: true },
        createdAt: { type: Date, default: new Date() }
    })
)
module.exports = model;