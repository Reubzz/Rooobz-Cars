const express = require('express');
const router = express.Router();
const path = require('path');
const config = require('../../config.json')
const carsDB = require('../../models/schemas/cars')
const { v4: uuidv4 } = require('uuid')
const { authCheck } = require('../../middleware/authentication/authentication');


// ! Cars Add api
router.post('/add', authCheck, async (req, res) => {  
    
    // if (res.locals.role != 'admin' && res.headersSent.apiKey != "admin") {
    //     return res.status(400).send("Admin Role required to Access this route.")
    // }
    const { 
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
    } = req.body


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
            res.status(200).send("Data Saved")
        })
    } catch (error) {
        res.status(400).send(error)        
    }
})

router.delete('/delete', async (req, res) => {
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
    }
    catch (error){
        
    }
})

module.exports = router;
