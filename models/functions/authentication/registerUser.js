// Functions
const { jwtSign, setJwtCookie } = require('../jwt/jwtSign')

// Database
const User = require('../../schemas/users')
const { v4: uuidv4 } = require('uuid')

/**
 * @error codes
 *  100 = No Errors
 *  101 = Username is already in use
 *  102 = Password is less than 6 chars
 *  103 = Database error / unknown error 
 *  104 = Username already in use 
 * 
 * @status codes 
 *  200 = User successfully created
 *  201 = User not created
 */

const error = {
    100: {
        message: "No Errors",
        code: 100
    },
    101: {
        message: "Username invalid/less than 4 characters",
        code: 101
    },
    102: {
        message: "Password less than 6 characters",
        code: 102
    },
    103: {
        message: "Unknown Error / DB error",
        code: 103
    },
    104: {
        message: "Username already in Use",
        code: 104
    },
}
const status = {
    200: {
        message: "User created",
        code: 200
    },
    201: {
        message: "User not created",
        code: 201
    },
}
exports.registerUser = async (req, res, next) => {
    const { name, username, password, email, role } = req.body
    if (username.length < 4) {
        return res.status(401).json({
            message: "Username Invalid",
            error: error[101],
            status: status[201]
        })
    }
    // Check if username is in use.
    const checkUsernameAvailable = await User.find({ username: username })
    if (checkUsernameAvailable.length > 0) {
        return res.status(401).json({
            error: error[104],
            status: status[201]
        })
    }
    if (password.length < 6) {
        return res.status(401).json({
            error: error[102],
            status: status[201]
        })
    }
    try {
        const id = uuidv4();
        await User.create({
            id: id,
            name: name,
            username: username,
            email: email,
            password: password,
            role: role,
            createdDate: new Date()
        }).then((user) => {
            // Creating JWT Token 
            // Setting the Cookie - creating session
            setJwtCookie(jwtSign(user), res);
            res.status(200).json({
                error: error[100],
                status: status[200],
            })
        })
    }
    catch (err) {
        res.status(401).json({
            error: error[103],
            status: status[201]
        })
        console.log('register User api - ' + err)
    }
}