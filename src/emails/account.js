const sgMail = require('@sendgrid/mail')
const { text } = require('express')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

// sgMail.send({
//     to:'kandarpa.sriyasaswini@gmail.com',
//     from: 'kandarpa.sriyasaswini@gmail.com',
//     subject: 'Test mail from sendgrid',
//     text: 'Received test mail'
// })
const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'kandarpa.sriyasaswini@gmail.com',
        subject: 'Welcome to task app',
        text: `Welcome to app, ${name}. Let me know how you get along`
    })
}

const sendCancelEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'kandarpa.sriyasaswini@gmail.com',
        subject: 'Please review',
        text: ` Hi ${name}. Please share your feedback`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelEmail
}