const mongoose = require('mongoose')
require("dotenv").config();

const DB_URI = process.env.DB_URI;

console.log(DB_URI)

// mongoose.URL_SHORTNER_DB = mongoose.createConnection(MAIN_DB_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })


module.exports = mongoose;