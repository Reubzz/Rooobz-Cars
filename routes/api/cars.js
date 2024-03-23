require("dotenv").config();
const express = require('express');
const router = express.Router();
const config = require('../../config.json')
const carsDB = require('../../models/schemas/cars')
const { apiAuthCheck } = require('../../middleware/authentication/apiAuthentication');
const { checkOrigin } = require('../../middleware/authentication/checkOrigin');

const AWS = require('aws-sdk')
const multer = require('multer');

// Configure AWS SDK
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: process.env.AWS_REGION
});

const s3 = new AWS.S3();

// Multer upload middleware
const upload = multer({
    limits: {
        fileSize: 100 * 1024 * 1024, // 100MB, adjust as needed
        files: 10 // Maximum number of files, adjust as needed
    }
});

// ! Cars Add api
router.post('/add', upload.array('images'), apiAuthCheck, checkOrigin, async (req, res) => {  

    try {
        const carData = req.body; // Form data
        const images = req.files; // Uploaded images

    
        // Upload images to S3
        const uploadedImageUrls = await Promise.all(images.map(async (image) => {
            const uploadParams = {
                Bucket: 'reubz',
                Key: `${carData.brand.toLowerCase()}-${carData.name.toLowerCase()}/${Math.floor(Math.random() * 100)}-${image.originalname.toLowerCase()}`, // You can set a different key as per your requirement
                Body: image.buffer, // Image data
                // ACL: 'public-read', // Make the uploaded image public
                ContentType: image.mimetype // Mime type of the image
            };
    
            const uploadResult = await s3.upload(uploadParams).promise();
            return uploadResult.Location; // URL of the uploaded image
        }));
        // Add image URLs to carData
        carData.imgUrls = uploadedImageUrls;

        await carsDB.create(carData);
        res.status(200).json({
            error: { code: 100, message: "No errors" },
            status: { code: 200, message: "Sucessfully Added New Car" }
        })
    } catch (error) {
        console.log('/api/cars.js - add car route - '+ error)

    }
})

// ! Cars Delete API
router.delete('/', async (req, res) => {
    const { id } = req.body;
    try {
        let car = await carsDB.find(id);
        if(!car) {
            return res.status(400).send("Cannot Delete No Car Found with ID = " + id);
        }
        carsDB.deleteOne(id)
            .then((deletedCar) => {
                res.status(200).send("Car Deleted with ID - " + id + " - " + deletedCar)
            })

        res.status(200).json({
            erorr: {
                code: 100,
                message: "No Error"
            },
            status: {
                code: 200,
                message: "Sucessfully Deleted"
            }
        })
    }
    catch (error){
        console.log('/api/cars.js delete route- '+ error)
    }
})

router.post('/status', async (req, res) => {
    const { id } = req.body;

    try {
        const car = await carsDB.findOne({ _id: id });
        await carsDB.updateOne(
            {
                _id: id
            },
            {
                status: car.status == "available" ? "unavailable" : "available"
            }
        )
        res.status(200).json({
            erorr: {
                code: 100,
                message: "No Error"
            },
            status: {
                code: 200,
                message: "Sucessfully Updated Status"
            }
        })
    } catch (err) {
        console.log('/api/cars.js - status route - ' + err)
    }
})

module.exports = router;
