require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files
app.use(express.static('public'));

// Debugging: Print current working directory
console.log('Current Directory:', __dirname);

// Log environment variables to verify they are loaded
console.log('Email User:', process.env.EMAIL_USER);
console.log('Email Pass:', process.env.EMAIL_PASS);

// Temporarily set environment variables for debugging
// process.env.EMAIL_USER = 'singhmuskan892002@gmail.com';
// process.env.EMAIL_PASS = 'nmrzgdpvkfajepdd';

// POST route to handle form submission
app.post('/send-email', (req, res) => {
    const { name, email, subject, description } = req.body;

    // Log incoming form data
    console.log('Form Data:', { name, email, subject, description });

    // Create a transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER, // your Gmail address
            pass: process.env.EMAIL_PASS  // your Gmail password or app password
        }
    });

    // Setup email data
    let mailOptions = {
        from: `"Contact Form" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_USER, // your email address to receive messages
        subject: subject,
        text: `Name: ${name}\nEmail: ${email}\n\nDescription:\n${description}`
    };

    // Send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).send(error.toString());
        }
        console.log('Email sent:', info.response);
        res.status(200).send('Email sent: ' + info.response);
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
