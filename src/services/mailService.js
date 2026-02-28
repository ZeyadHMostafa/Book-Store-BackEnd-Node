const process = require('node:process');
const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  let transporter;

  if (process.env.EMAIL_HOST && process.env.EMAIL_USERNAME) {
    console.log('EMAIL_HOST:', process.env.EMAIL_HOST);
    console.log('EMAIL_PORT:', process.env.EMAIL_PORT);
    console.log('EMAIL_USERNAME:', process.env.EMAIL_USERNAME);
    console.log('EMAIL_PASSWORD:', process.env.EMAIL_PASSWORD);
    transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT) || 587,
      secure: process.env.EMAIL_PORT === '465',
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
      }
    });
  } else {
    // Use hardcoded Ethereal creds (go to https://ethereal.email/create and paste yours)
    transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: 'reanna.cruickshank38@ethereal.email', // <-- paste once, reuse forever
        pass: 'wt6s42uadFBzcNBQfn'
      }
    });
  }

  const mailOptions = {
    from: 'E-commerce Book Store <noreply@bookstore.com>',
    to: options.email,
    subject: options.subject,
    text: options.message
  };

  const info = await transporter.sendMail(mailOptions);
  console.log('Email sent, preview: %s', nodemailer.getTestMessageUrl(info));
};

module.exports = {sendEmail};
