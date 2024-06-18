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

// POST route to handle form submission
app.post('/send-email', (req, res) => {
    const { name, email, subject, description } = req.body;

    // Create a transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'singhmuskan892002@gmail.com', // your Gmail address
            pass: 'nmrz gdpv kfaj epdd'   // your Gmail password or app password
        }
    });

    // Setup email data
    let mailOptions = {
        from: '"Contact Form" <singhmuskan892002@gmail.com>',
        to: 'singhmuskan892002@gmail.com', // your email address to receive messages
        subject: subject,
        text: `Name: ${name}\nEmail: ${email}\n\nDescription:\n${description}`
    };

    // Send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }
        res.status(200).send('Email sent: ' + info.response);
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
