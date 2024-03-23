const mongoose = require('mongoose')
require("dotenv").config();

const DB_URI = process.env.DB_URI;

mongoose.MAIN_DB = mongoose.createConnection(DB_URI)


module.exports = mongoose;