require('dotenv').config();
const jwtSecret = process.env.JWT
const jwt = require('jsonwebtoken')

// Config file
const { loginMaxAge } = require('../../../config.json')

exports.jwtSign = (user) => {
    try {
        const token = jwt.sign(
            {
                _id: user._id,
                id: user.id,
                name: user.name,
                username: user.username,
                email: user.email,
                role: user.role,
                profileImg: user.profileImg,
            },
            jwtSecret,
            { 
                expiresIn: loginMaxAge
            }  
        );
        return token;
    } catch (error) {
        console.log('error jwtSign() in jwtSign.js', error.message)
    }
}

exports.setJwtCookie = (token, res) => {
    try {
        res.cookie('jwt', token, {
            httpOnly: true,
            maxAge: loginMaxAge * 1000,
            sameSite: 'lax'
        })
    }
    catch (error) {
        console.log('error jwtSign() in jwtSign.js', error.message)
    }

}