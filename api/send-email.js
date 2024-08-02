const nodemailer = require('nodemailer');

module.exports = (req, res) => {
    require('dotenv').config();

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
};
