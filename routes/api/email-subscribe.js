const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid')
const emailList = require('../../models/schemas/email-subscribe');

const error = {
    100: {
        message: 'No error',
        code: 100
    },
    101: {
        message: 'Email not provided',
        code: 101
    },
    102: {
        message: 'Email already in List',
        code: 102
    },
    103: {
        message: 'Unknown Error',
        code: 103
    },
}

const status = {
    200: {
        message: "Added Email to mailing list",
        code: 200,
    },
    201: {
        message: "Cant add to mailing list",
        code: 201,
    },
}
router.post('/', async (req, res) => {    
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({
            error: error[101],
            status: status[201]
        })
    }
    const check = await emailList.findOne({ email: email });
    if(check) {
        return res.status(401).json({
            error: error[102],
            status: status[201]
        })
    }

    try {
        const id = uuidv4();
        await emailList.create({
            id: id,
            email: email,
            createdAt: new Date(),
        }).then(() => {
            res.status(200).json({
                error: error[100],
                status: status[200]
            })
            return;
        })
    } catch (err) {
        console.log('subscribe api - ' + err)
        return res.status(400).json({
            error: error[103],
            status: status[201]
        })
    }
})

module.exports = router;
