const nodemailer = require('nodemailer');
require("dotenv").config();

// Function to send email
async function sendEmail(receiverEmail, subject, htmlContent, invoicePdf = null) {
    try {
        // Create a Nodemailer transporter using SMTP
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_SMTP,
            port: process.env.EMAIL_PORT, 
            secure: true, // true for 465, false for other ports
            auth: {
                user: process.env.EMAIL_USERNAME, 
                pass: process.env.EMAIL_PASSWORD 
            }
        });

        // Send mail with defined transport object
        let attachmentsArray;
        if(invoicePdf) {
            attachmentsArray = [{
                filename: "Invoice.pdf",
                content: invoicePdf,
                encoding: 'base64',
                contentType: 'application/pdf', // Content-Type header
                contentDisposition: 'attachment' // Content-Disposition header
            }]
            
        }
        let info = await transporter.sendMail({
            from: '"Rooobz Cars" <no-reply@reubz.io>', // sender address
            to: receiverEmail, // list of receivers
            subject: subject, // Subject line
            html: htmlContent, // HTML content
            attachments: attachmentsArray,
        });

        return true; // Return true if email sent successfully
    } catch (error) {
        console.error('Error occurred while sending email:', error);
        return false; // Return false if email sending fails
    }
}

module.exports = {
    sendEmail
};
