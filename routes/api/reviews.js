// Imports
const express = require('express');
const router = express.Router();
const multer = require('multer')

// Databases
const reviewsDB = require('../../models/schemas/reviews')

// Middlewares
const { authCheck } = require('../../middleware/authentication/authentication');
const { apiAuthCheck } = require('../../middleware/authentication/apiAuthentication');
const { checkOrigin } = require('../../middleware/authentication/checkOrigin');

const upload = multer();


// ! Create Review API Endpoint
router.post('/', upload.none(),authCheck, checkOrigin, async (req, res) => {
    const { carid, content, rating } = req.body;
    if (!carid || !content || !rating) return res.status(400).json({
        error: { code: 101, message: 'Missing fields' },
        status: { code: 201, message: 'Cannot Add Review' }
    });

    await reviewsDB.create({
        user: res.locals._id,
        car: carid,
        content: content,
        rating: rating,
        createdAt: new Date()
    })
    res.status(200).json({
        error: { code: 100, message: "No Errors" },
        status: { code: 200, message: "Review Added Successfully" }
    })
});

router.delete('/', authCheck, checkOrigin, async (req, res) => {
    const { id, user } = req.body;

    // Validate if User Deleting is the user who made the review or an admin
    if (res.locals._id != user && res.locals.role != 'admin') {
        return res.status(403).json({
            error: { code: 102, message: "Unauthorized Access" },
            status: { code: 201, message: "Forbidden" }
        });
    };
    
    if (!id) return res.status(400).json({
        error: { code: 101, message: 'Missing fields' },
        status: { code: 201, message: 'Cannot Delete Review' }
    });
    await reviewsDB.deleteOne({ _id: id })
    res.status(200).json({
        error: { code: 100, message: "No Errors" },
        status: { code: 200, message: "Review Deleted Successfully" }
    })
})

module.exports = router;
