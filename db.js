const mongoose = require('mongoose')
const AWS = require('aws-sdk');
require("dotenv").config();

// Mongoose Config
const DB_URI = process.env.DB_URI;
mongoose.MAIN_DB = mongoose.createConnection(DB_URI)

// Configure AWS SDK
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: process.env.AWS_REGION
});

const s3 = new AWS.S3();


module.exports = { mongoose, s3 };