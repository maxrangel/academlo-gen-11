const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const pug = require('pug');
const { htmlToText } = require('html-to-text');

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
  async send() {
    // Get the pug file that needs to be send
    const html = pug.renderFile(`${__dirname}/../views/emails/baseEmail.pug`, {
      title: 'Email sent from NodeJS',
    });

    await this.createTransport().sendMail({
      from: 'academloblogs@gmail.com',
      to: 'max@gmail.com',
      subject: 'New account',
      html,
      text: htmlToText(html),
    });
  }

  // Send an email to newly created account
  async sendWelcome() {
    await this.send();
  }
}

module.exports = { Email };
