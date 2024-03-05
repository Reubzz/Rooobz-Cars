// check sessions here 
require('dotenv').config()
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT;


const status = {
    200: {
        message: "Authorized User",
        code: 200
    },
    201: {
        message: "Not Authorized",
        code: 201
    },
}

exports.authCheck = async (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, jwtSecret, (err, decodedToken) => {
            if (err) {
                console.log(err)
                return res.status(401).send("Unknown Error | Kindly clear all cookies from your browser then access the page")
            }

            else {
                res.locals.role = decodedToken.role;
                res.locals.id = decodedToken.id;
                res.locals._id = decodedToken._id;
                res.locals.username = decodedToken.username;
                res.locals.name = decodedToken.name;
                res.locals.email = decodedToken.email;
                res.locals.profileImg = decodedToken.profileImg;
                next();
            }
        })
    }
    else {
        res.locals.userRole = "default"
        next()
    }
}