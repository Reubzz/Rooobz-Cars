// ? Edits user's pfp in the database. 
// Functions
const { jwtSign, setJwtCookie } = require('../jwt/jwtSign')

// Database
const User = require('../../schemas/users')

// Imports 
const { s3 } = require('../../../db');

const status = {
    200: {
        message: "Edited user pfp",
        code: 200
    },
    201: {
        message: "Couldn't Edit user pfp",
        code: 201
    }
};
const error = {
    100: {
        message: "No Errors",
        code: 100
    },
    101: {
        message: "Unsupported File Type. Allowed types - .jpeg .jpg .png .webp",
        code: 101
    },
    102: {
        message: "Unknown Error",
        code: 102
    },
};

exports.pfpUpdate = async (req, res, next) => {
    const image = req.file; // Uploaded images

    // * Get current User Account from Database 
    const currentUser = await User.findOne({ id: res.locals.id})

    try {
        const uploadParams = {
            Bucket: 'reubz',
            Key: `profile-images/${currentUser._id}-${currentUser.username}/${Math.floor(Math.random() * 100)}-${image.originalname.toLowerCase()}`, 
            Body: image.buffer, // Image data
            ContentType: image.mimetype // Mime type of the image
        };
        const uploadResult = await s3.upload(uploadParams).promise();
        

        currentUser.profileImg = uploadResult.Location;
        currentUser.save();
        setJwtCookie(jwtSign(currentUser), res);
        return res.status(200).json({ error: error[100], status: status[200] })
    } catch (err) {
        res.status(401).json({
            error: error[103], 
            status: status[201]
        })
        return console.log('edit user pfp api - ' + err);
    }
}