const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

class Email {
  constructor() {}

  // Create a connection with an email service
  createTransport() {
    return nodemailer.createTransport({
      host: 'smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS,
      },
    });
  }

  // Send the actual email
  send() {}

  // Send an email to newly created account
  sendWelcome() {}
}

module.exports = { Email };
