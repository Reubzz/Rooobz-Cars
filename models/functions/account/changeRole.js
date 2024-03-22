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

// Functions
const { jwtSign, setJwtCookie } = require('../jwt/jwtSign')

const User = require('../../schemas/users')

const status = {
    200: {
        message: "Changed user roles",
        code: 200
    },
    201: {
        message: "Couldn't change user roles",
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
        message: "This user is already the role you selected",
        code: 102
    },
    105: {
        message: "Unknown Error",
        code: 105
    },
};

exports.changeRole = async (req, res, next) => {
    const { id } = req.body;

    try {
        const user = await User.findOne({ _id: id })
        const newRole = user.role == 'admin' ? 'basic' : 'admin';
        await User.updateOne(
            {
                _id: id
            },
            {
                role: newRole
            }
        )
        
        return res.status(200).json({ error: error[100], status: status[200] })
    } catch (err) {
        res.status(400).json({
            error: error[105], 
            status: status[201]
        })
        return console.log('change user role api - ' + err);
    }
}