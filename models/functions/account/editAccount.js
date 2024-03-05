// ? Edits user's details in the database. 

/**
 * @status codes
 * * 200 - Edited user
 * ! 201 - Couldn't Edit user
 * 
 * @error codes 
 * * 100 - No errors
 * ! 101 - Invalid Field
 * ! 102 - Field Value already in use
 * ! 103 - Field restricted
 * ! 104 - Database Error
 * ! 105 - Unknown Error
*/
const jwtSecret = process.env.JWT
const jwt = require('jsonwebtoken')
const { loginMaxAge } = require('../../../config.json')

const User = require('../../schemas/users')

const status = {
    200: {
        message: "Edited user",
        code: 200
    },
    201: {
        message: "Couldn't Edit user",
        code: 201
    }
};
const error = {
    100: {
        message: "No Errors",
        code: 100
    },
    101: {
        message: "Field Cannot be Empty",
        code: 101
    },
    102: {
        message: "Field Value already in use",
        code: 102
    },
    103: {
        message: "Field restricted",
        code: 103
    },
    104: {
        message: "Database Error",
        code: 104
    },
    105: {
        message: "Unknown Error",
        code: 105
    },
};

const requiredFields = ['username', 'email', 'password', 'name']
exports.editAccount = async (req, res, next) => {
    const fieldObj = req.body;
    let fieldValue;
    let fieldName;
    for (const key in fieldObj) {
        fieldName = key;
        fieldValue = fieldObj[key];
    }

    // * Get current User Account from Database 
    const currentUser = await User.findOne({ id: res.locals.id})

    // ? Check if edited field is a username
    // * If so, check if the new username exists and isn't the current user
    try {
        if(fieldName == 'username') {
            const check = await User.findOne({ [fieldName]: fieldValue });
            // ! If username already in use
            if(check) return res.status(401).json({ error: error[102], status: status[201] })
        }

        // * If other field or username is unique
        if (fieldValue == null || fieldValue == '') {
            // * Field not provided, remove it from update object
            if (requiredFields.includes(fieldName))
                return res.status(400).json({ error: error[101], status: status[201] })
        }
        currentUser[fieldName] = fieldValue;
        currentUser.save();
        console.log(currentUser)
        refreshJwtToken(req, res, currentUser);
        return res.status(200).json({ error: error[100], status: status[200] })
    } catch (err) {
        res.status(400).json({
            error: error[105], 
            status: status[201]
        })
        return console.log('edit user api - ' + err);
    }
}

async function refreshJwtToken(req, res, refreshedData) {
    const token = jwt.sign({    
        id: refreshedData.id,
        username: refreshedData.username,
        name: refreshedData.name,
        role: refreshedData.role,
        email: refreshedData.email,
        profileImg: refreshedData.profileImg
    },
    jwtSecret,
    { expiresIn: loginMaxAge})
    res.cookie('jwt', token, {
        httpOnly: true,
        maxAge: loginMaxAge * 1000,
        sameSite: 'lax'
    })
}