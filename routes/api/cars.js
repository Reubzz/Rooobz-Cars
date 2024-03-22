const express = require('express');
const router = express.Router();
const path = require('path');
const config = require('../../config.json')
const carsDB = require('../../models/schemas/cars')
const { v4: uuidv4 } = require('uuid')
const { authCheck } = require('../../middleware/authentication/authentication');
const { error } = require('console');


// ! Cars Add api
router.post('/add', authCheck, async (req, res) => {  
    
    // if (res.locals.role != 'admin' && res.headersSent.apiKey != "admin") {
    //     return res.status(400).send("Admin Role required to Access this route.")
    // }
    const dataArr = req.body;
    dataArr.forEach(async (carData) => {
        let {
            name, 
            brand, 
            color, 
            description, 
            condition, 
            doors, 
            transmission, 
            fuelType, 
            seats, 
            price, 
            discount, 
            status, 
            imgUrls, 
            createdTime, 
            updateTime 
        } = carData

        try {
            const id = uuidv4()
            await carsDB.create({
                id: id,
                name: name,
                brand: brand,
                color: color,
                description: description,
                condition: condition,
                doors: doors,
                transmission: transmission,
                fuelType: fuelType, 
                seats: seats,
                price: price,
                discount: discount,
                status: status,
                imgUrls: imgUrls,
                createdTime: createdTime,
                updateTime: updateTime,
            }).then((car) => {
                console.log(car.name + "saved ")
            })
        } catch (error) {
            console.log('/api/cars.js - add car route - '+ error)

        }
    })
    res.status(200).send("Data Saved")
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
