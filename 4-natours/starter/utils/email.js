const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // 1. create a transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // 2. Defind the email options
  const mailOptions = {
    from: 'Naruephon <admin@tum.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
    // html:
  };

  // 3. Actually send the email
  // return promise
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
