const User = require('../../schemas/users')

const status = {
    200: {
        message: "Deleted user ",
        code: 200
    },
    201: {
        message: "Couldn't Delete user ",
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
        message: "This user is not in the database",
        code: 102
    },
    105: {
        message: "Unknown Error",
        code: 105
    },
};

exports.deleteUser = async (req, res, next) => {

    const { id } = req.body;
    
    try {
        const check = await User.findOne({ _id: id })
        if(!check) return res.status(401).json({ error: error[102], status: status[201] })
        
        await User.deleteOne({ _id: id })
        
        return res.status(200).json({ error: error[100], status: status[200] })
    } catch (err) {
        res.status(400).json({
            error: error[105], 
            status: status[201]
        })
        return console.log('change user role api - ' + err);
    }
}