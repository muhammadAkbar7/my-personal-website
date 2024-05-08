'use strict';

const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

let htmlTop = `
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Muhammad Akbar</title>
    <link rel='stylesheet' type='text/css' media='screen' href='main.css'>
    <link rel="apple-touch-icon" sizes="180x180" href="apple-touch-icon.png"> 
    <link rel="icon" type="image/png" sizes="512x512" href="android-chrome-512x512.png">
    <link rel="icon" type="image/png" sizes="192x192" href="android-chrome-192x192.png"> 
    <link rel="icon" type="image/png" sizes="32x32" href="favicon-32x32.png"> 
    <link rel="icon" type="image/png" sizes="16x16" href="favicon-16x16.png"> 
    <link rel="manifest" href="site.webmanifest"> 
    <meta name="robots" content="noindex, nofollow">
    <script src='main.js'></script>
</head>
<body>
    <header>
        <h1><img src="android-chrome-192x192.png" alt="My website's favicon">Muhammad Akbar</h1>
    </header>
    <nav>
        <a href="index.html">Home</a>
        <a href="gallery.html">Gallery</a>
        <a href="contact.html">Contact</a>
    </nav>
    <section>
        <h2>Contact</h2>
        <article class ="contact">
            <p>This form is for to reach out to me with any job or personal interest! Please fill out the following information:</p>
            <div id="formResult">
`;

let htmlBottom = `
            </div>
        </article>
    </section>
    <footer>
        <p>&copy; 2024 Muhammad Akbar</p>
    </footer>
</body>
</html>
`;


app.post('/contact', (req, res) => {
    let name = req.body.name;
    let email = req.body.email;
    let message = req.body.message;
    let topic = req.body.topic;
    let availability = req.body.availability;
    let contactMethods = Array.isArray(req.body['contact-methods']) ? req.body['contact-methods'] : [req.body['contact-methods']];

        // Create a SMTP transporter object
        let transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false,
            auth: {
                user: 'lourdes.schimmel86@ethereal.email',
                pass: 'pvBPH4vKDsAcDMCsPN'
            }
        });

    let formResult = `
        <h3>Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
        <p><strong>Topic:</strong> ${topic}</p>
        <p><strong>Preferred time for contact:</strong> ${availability}</p>
        <p><strong>Contact Methods:</strong> ${contactMethods.join(', ')}</p>
    `;

    let result = `
    Name: ${name}
    Email: ${email}
    Message: ${message}
    Topic: ${topic}
    Preferred time for contact: ${availability}
    Contact Methods: ${contactMethods.join(', ')}
`;

    let customMessage = `Hi! Muhammad, here! Thanks for reaching out! I'll get back to you as soon as I can.
    Below is the information you sent me. Hope you're having a good day!`

        // Message object
        let messageE = {
            from: 'Muhammad Akbar <akbarmu@oregonstate.edu>',
            to: email,
            subject: 'Contact Form Email',
            text: customMessage + result,
            html: customMessage + formResult
        };

        let fullHTML = htmlTop + formResult + htmlBottom;
    transporter.sendMail(messageE, (err, info) => {
        if (err) {
            console.log('Error occurred. ' + err.message);
            return process.exit(1);
        }

        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });

    res.send(fullHTML);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});



