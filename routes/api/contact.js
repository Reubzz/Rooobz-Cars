// Imports
const express = require('express');
const router = express.Router();
const config = require('../../config.json')
const moment = require('moment');
const { checkOrigin } = require('../../middleware/authentication/checkOrigin');
const multer = require('multer')
const upload = multer();
const { sendEmail } = require('../../models/functions/email/sendEmail')


const error = {
    100: {
        message: 'No error',
        code: 100
    },
    101: {
        message: 'Fields Incomplete - Email Message cannot be Sent',
        code: 101
    },
    102: {
        message: 'Unknown Error',
        code: 102
    },
}

const status = {
    200: {
        message: "Message Email Sent",
        code: 200,
    },
    201: {
        message: "Couldn't Send Email Message",
        code: 201,
    },
}
router.post('/', upload.none(), checkOrigin, async (req, res) => {    
    
    // Get the data from the request body
    const { message, email, name, phone } = req.body;

    if (!message || !email || !name || !phone) {
        res.status(400).json({
            error: error[101],
            status: status[201]
        })
    }

    try {
        await sendEmail(
            'contact@reubz.io',
            'Contact Form Submission - Forwarded Email',
            `
                -------------- Forwarded Email -------------
                <br>
                <strong>Name:</strong> ${name}
                <br>
                <strong>Email:</strong> ${email}
                <br>
                <strong>Phone:</strong> ${phone}
                <br>
                <strong>Date:</strong> ${moment().format('DD-MM-YYYY')} at ${moment().format('HH:MM')}
                <br>
                <br>
                <strong>Message:</strong>
                <br>
                 ${message.replace(/\r?\n/g, '<br>')}
            `
        )

        await sendEmail(
            `${email}`,
            "Your message has been sent successfully",
            `
                <img src="https://rooobzcars.reubz.io/imgs/dark/logo-with-text-long.png" alt="Rooobz Cars Logo">
                <h2>Your message has been sent successfully!</h2> 
                <br>
                Thank you for reaching out to us. We will get back to you as soon as possible. 
                <br>
                <br>
                <strong>Your Message: </strong>
                <br>
                ${message.replace(/\r?\n/g, '<br>')}
                
                <br>
                <br>

                <p>This is a automated message sent to you as a confirmation of your message on our "Contact Us" Page being sent successfully.</p>
                <br>
                <p>If you didn't do anything, kindly ignore this email.</p>
            `
        )
        res.status(200).json({
            error: error[100],
            status: status[200]
        })
    } catch (err) {
        console.log("Error in - /api/contact.js - API Post Req - " + err);
        return res.status(401).json({
            error: error[102],
            status: status[201]
        });
    }
})

module.exports = router;